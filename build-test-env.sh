#!/bin/bash -x

if [[ -z $(docker images | grep "vbsantos-tcc/frontend") ]];
then
    echo "Building Frontend for tests"
    git clone "https://github.com/vbsantos/fazumbem-frontend-tcc.git"
    cd fazumbem-frontend-tcc
    git checkout pipeline-test
    docker build --rm -t vbsantos-tcc/frontend:latest ./fazumbem-frontend-tcc
    cd ..
fi

if [[ -z $(docker images | grep "vbsantos-tcc/backend") ]];
then
    echo "Building Backend for tests"
    git clone "https://github.com/vbsantos/fazumbem-backend-tcc.git"
    cd fazumbem-backend-tcc
    git checkout pipeline-test
    docker build --rm -t vbsantos-tcc/backend:latest ./fazumbem-backend-tcc
    cd ..
fi

echo "Building ENV"
docker compose up --build -d

