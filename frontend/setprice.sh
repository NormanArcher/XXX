

git pull

set -o errexit
set -x
set -a
set -m

scp -i ../yot.pem public/data/price.json centos@13.112.68.172:/home/centos

ssh -i ../yot.pem centos@13.112.68.172 "sudo cp /home/centos/price.json /www/wwwroot/yot/data"


exit

ssh -i ../yot.pem centos@13.112.68.172
