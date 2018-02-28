#! /usr/bin/env bash
npm run build

project=your-site
containerUser=your-container-registry
containerPasssword=your-password-container
containerRepository=your-container-registry.azurecr.io

. ./deploy-common.sh 


