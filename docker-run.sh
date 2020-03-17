#!/bin/bash

# run with this cmd:
# ./docker-run.sh maakjemondmasker.be

DOMAIN_NAME=${1:-maakjemondmasker.be}
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ $BRANCH == master ]
then
    SUBDOMAIN=www
else
    SUBDOMAIN=$BRANCH
fi

FULL_DOMAIN="${SUBDOMAIN}.${DOMAIN_NAME}"

docker build -t babbelbox:$BRANCH --build-arg vcsref=$(git rev-parse --short HEAD) --build-arg DOMAIN=$FULL_DOMAIN .
docker stop $FULL_DOMAIN && docker rm $FULL_DOMAIN

if [ $BRANCH == master ]
then
    docker run -d \
        --network proxy \
        -l traefik.enable=true \
        -l traefik.http.routers.bb-$SUBDOMAIN.entrypoints=http \
        -l traefik.http.routers.bb-$SUBDOMAIN.rule="Host(\`${DOMAIN_NAME}\`, \`www.${DOMAIN_NAME}\`)" \
        -l traefik.http.routers.bb-$SUBDOMAIN.middlewares=https-redirect@file \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.entrypoints=https \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.rule="Host(\`${DOMAIN_NAME}\`, \`www.${DOMAIN_NAME}\`)" \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.tls=true \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.tls.certresolver=http \
        -l traefik.docker.network=proxy \
        --name "${FULL_DOMAIN}" \
        babbelbox:$BRANCH
else
    docker run -d \
        --network proxy \
        -l traefik.enable=true \
        -l traefik.http.routers.bb-$SUBDOMAIN.entrypoints=http \
        -l traefik.http.routers.bb-$SUBDOMAIN.rule="Host(\`${FULL_DOMAIN}\`)" \
        -l traefik.http.routers.bb-$SUBDOMAIN.middlewares=https-redirect@file \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.entrypoints=https \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.rule="Host(\`${FULL_DOMAIN}\`)" \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.tls=true \
        -l traefik.http.routers.bb-$SUBDOMAIN-secure.tls.certresolver=http \
        -l traefik.docker.network=proxy \
        --name "${FULL_DOMAIN}" \
        babbelbox:$BRANCH
fi