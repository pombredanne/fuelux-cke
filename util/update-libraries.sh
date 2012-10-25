#!/bin/sh

# set the current directory to this file's parent, then move up to fuelux-editor
cd "$(dirname "$0")"
cd ../

# use volo to force add all base libraries (order is important)
volo add jrburke/requirejs -f -nostamp
volo add jrburke/almond -f -nostamp
volo add jquery/jquery -f -nostamp
volo add ckeditor/ckeditor-dev -f -nostamp

# build ckeditor using their custom sh file
lib/ckeditor-dev/dev/builder/build.sh