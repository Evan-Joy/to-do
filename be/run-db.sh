#!/bin/bash

cp_dev="PG_docker-compose.dev.yml"
cp_prod="PG_docker-compose.prod.yml"

read -p "Enter to select mode [dev/prod]: " MODE

if [[ "$MODE" == "prod" ]]; then
  sudo docker-compose --project-name to-do-base  --env-file .env -f db-compose/$cp_prod up -d --build
else
  sudo docker-compose --project-name to-do-base  --env-file .env -f db-compose/$cp_dev up -d --build
fi
