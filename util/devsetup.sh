#!/bin/sh

# setup nvm
curl https://raw.github.com/creationix/nvm/master/install.sh | sh

#install necessary node version
nvm install 0.8.14

#remove older globals
npm uninstall -g grunt

#install necessary globals
npm install -g grunt-cli
npm install -g volo