#!/bin/bash
stopTask=${1}

###############################################################################
# COLORS
###############################################################################
colorRed='\e[0;31m'
colorGreen='\e[0;32m'
colorOrange='\e[1;33m'
colorYellow='\e[0;33m'
colorBlue='\e[0;34m'
colorPurple='\e[0;35m'
noColor='\033[0m'


# Parse arguments to this script
while [[ $# -gt 1 ]]; do
  key="$1"
  case $key in
    -d|--docker-namespace)
    DOCKER_NAMESPACE="$2"
    shift
    ;;
    -t|--tag)
    TAG="$2"
    shift # past argument
    ;;
    -p|--project)
    GCP_TEST_PROJECT="$2"
    shift # past argument
    ;;
    *)
    # unknown option
    usage
    ;;
  esac
  shift
done

###############################################################################
# GENERATE TAG
###############################################################################
generateTag()
{

    BUILD_TIMESTAMP="$(date -u +%Y%m%d%H%M%S)"
    if [ -z "${TAG}" ]; then
    export tag="${BUILD_TIMESTAMP}"
    fi

}

###############################################################################
# DEPLOYING
###############################################################################
deploy()
{

    echo -e "$colorBlue Ready to deploy $colorYellow$project$noColor in Microsoft? (Y/n)"
    read shouldDeploy

    if [ "$shouldDeploy" = "Y" ];then
        echo -e "Login in $containerRepository"
        echo -e "\xF0\x9F\x90\xB3 Build docker image...\n"
        docker login $containerRepository -u $containerUser -p $containerPasssword

        echo -e "Deploying $colorYellow$project\n $noColor"
        echo -e "\xF0\x9F\x90\xB3 Build docker image...\n"
        docker build -t $project:$tag ../ &&

        echo -e "\n\xF0\x9F\x9A\x80 Upload docker image...\n"
        docker tag $project:$tag $containerRepository/$project:$tag &&
        docker push $containerRepository/$project:$tag
    fi
}

###############################################################################
# STARTING POINT
###############################################################################
clear

generateTag
deploy


