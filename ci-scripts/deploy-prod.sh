#! /usr/bin/env bash
npm run build

project=moneyex-site
containerUser=moneyexcontainerregistry
containerPasssword=bK0DWvJyBqervbNouBZq/MEqMpSn0j7S
containerRepository=moneyexcontainerregistry.azurecr.io

. ./deploy-common.sh 


