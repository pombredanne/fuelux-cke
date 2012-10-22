#!/bin/sh

# set the current directory to this file's parent, then move up to fuelux-editor
cd "$(dirname "$0")"
cd ../

# use volo to force add all base libraries (order is important)
volo add jrburke/requirejs -f
volo add jquery/jquery -f
volo add ckeditor/ckeditor-dev -f