#!/usr/bin/env bash

set -x
rm dist.tar.gz
set -e

git pull
(rm -rf dist && npm run build:prod)

set -o errexit
set -x
set -a
set -m

chmod 400 ../oseanswap.pem
tar -zcvf dist.tar.gz dist > /dev/null

scp -i ../oseanswap.pem dist.tar.gz ubuntu@18.180.79.169:/home/ubuntu

ssh -i ../oseanswap.pem ubuntu@18.180.79.169 "rm -rf dist;sudo rm -rf /www/wwwroot/xfarm/*; tar -zxvf dist.tar.gz; sudo cp -rf /home/ubuntu/dist/* /www/wwwroot/xfarm/"


exit

ssh -i ../oseanswap.pem ubuntu@18.180.79.169
