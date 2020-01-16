#!/bin/bash

# Docker MongoDBを起動

CURRENT_DIR=`pwd`;
SHELL_DIR=$(cd $(dirname $0) && pwd)

cd $SHELL_DIR
mkdir ../mongodb

cd ../mongodb

HOST_DB=`pwd`/db

docker pull mongo
docker stop todo-nextjs-app-mongo
docker rm todo-nextjs-app-mongo
docker run -d -p 27017:27017 -v "${HOST_DB}:/data/db" --name todo-nextjs-app-mongo mongo

cd $CURRENT_DIR
