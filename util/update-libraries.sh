#!/bin/sh

# set the current directory to this file's parent, then move up to fuelux-ckeditor
cd "$(dirname "$0")"
cd ../

# use volo to force add all base libraries (order is important)
volo add ckeditor/ckeditor-dev -f

# build ckeditor
chmod +x ./lib/ckeditor-dev/dev/builder/build.sh
./lib/ckeditor-dev/dev/builder/build.sh