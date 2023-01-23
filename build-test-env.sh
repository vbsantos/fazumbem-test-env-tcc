#!/bin/bash -x

if [[ -z $(docker images | grep "vbsantos-tcc/frontend") ]]; then
    echo "Building Frontend for tests"
    git clone "https://github.com/vbsantos/fazumbem-frontend-tcc.git"
    cd fazumbem-frontend-tcc
    git checkout pipeline-test
    ls -la
    docker build --file ./Dockerfile --tag vbsantos-tcc/frontend:latest .
    cd ..
fi

if [[ -z $(docker images | grep "vbsantos-tcc/backend") ]]; then
    echo "Building Backend for tests"
    git clone "https://github.com/vbsantos/fazumbem-backend-tcc.git"
    cd fazumbem-backend-tcc
    git checkout pipeline-test
    ls -la
    docker build --file ./Dockerfile --tag vbsantos-tcc/backend:latest .
    cd ..
fi

# install cypress required libs
# apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb npm -y

echo "Building ENV"

docker compose down --volumes
docker compose up --build -d
