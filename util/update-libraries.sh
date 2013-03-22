#!/bin/sh

# set the current directory to this file's parent, then move up to fuelux-ckeditor
cd "$(dirname "$0")"
cd ../

# use volo to force add all base libraries (order is important)
volo add jrburke/requirejs -f
volo add jquery/jquery -f
volo add jquery/qunit/#qunit/ -f
volo add ckeditor/ckeditor-dev -f
volo add cloudhead/less.js/#dist/less-1.3.3.js -f
volo add kevinparkerson/requirejs-aurl -f

# build ckeditor
chmod +x ./lib/ckeditor-dev/dev/builder/build.sh
./lib/ckeditor-dev/dev/builder/build.sh