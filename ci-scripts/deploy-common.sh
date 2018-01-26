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

###############################################################################
# LOGGING IN
###############################################################################
login()
{
    deploy
}


###############################################################################
# DEPLOYING
###############################################################################
deploy()
{

    echo -e "$colorBlue Ready to deploy $colorYellow$project$noColor in ? (Y/n)"
    read shouldDeploy

    if [ "$shouldDeploy" = "Y" ];then
        echo -e "Login in $containerRepository"
        echo -e "\xF0\x9F\x90\xB3 Build docker image...\n"
        docker login $containerRepository -u $containerUser -p $containerPasssword

        echo -e "Deploying $colorYellow$project\n $noColor"
        echo -e "\xF0\x9F\x90\xB3 Build docker image...\n"
        docker build -t $project ../ &&

        echo -e "\n\xF0\x9F\x9A\x80 Upload docker image...\n"
        docker tag $project:latest $containerRepository/$project &&
        docker push $containerRepository/$project
    fi
}

###############################################################################
# STARTING POINT
###############################################################################
clear

login


