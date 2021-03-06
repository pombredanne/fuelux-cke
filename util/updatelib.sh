#!/bin/sh

# use volo to force add all base libraries
volo add ckeditor/ckeditor-dev -f
volo add jquery/jquery -f
volo add jquery/qunit/#qunit/ -f
volo add jrburke/requirejs -f

# build ckeditor
chmod +x ./lib/ckeditor-dev/dev/builder/build.sh
./lib/ckeditor-dev/dev/builder/build.sh

#force add everything in builder to override the gitignore file the ckeditor devs put in there
git add lib/ckeditor-dev/dev/builder/** -f