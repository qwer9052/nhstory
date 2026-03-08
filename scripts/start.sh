#!/bin/bash
cd /home/rocky/nhstory
AUTH_SECRET=nhstory-super-secret-key-min-32-chars \
AUTH_KEYCLOAK_ID=nhstory-app \
AUTH_KEYCLOAK_SECRET=GTlXu4l8enzKe8mMrphay5kSYC1onL7E \
AUTH_KEYCLOAK_ISSUER=https://auth.nhstory.site/realms/story \
ORIGIN=https://home.nhstory.site \
pm2 start build/index.js --name nhstory
pm2 save
echo nhstory started!