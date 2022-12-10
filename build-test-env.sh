#!/bin/bash -x

if [[ -z $(docker images | grep "vbsantos-tcc/frontend") ]];
then
    echo "Building Frontend for tests"
    git clone "https://github.com/vbsantos/fazumbem-frontend-tcc.git"
    git checkout pipeline-test
    docker build --rm -t vbsantos-tcc/frontend:latest ./fazumbem-frontend-tcc
fi

if [[ -z $(docker images | grep "vbsantos-tcc/backend") ]];
then
    echo "Building Backend for tests"
    git clone "https://github.com/vbsantos/fazumbem-backend-tcc.git"
    git checkout pipeline-test
    docker build --rm -t vbsantos-tcc/backend:latest ./fazumbem-backend-tcc
fi

echo "Building ENV"
docker compose up --build -d

