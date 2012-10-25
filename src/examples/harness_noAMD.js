/*
 * Fuel UX CKeditor (Example Harness - no AMD)
 * https://github.com/ExactTarget/fuelux-ckeditor
 *
 * Copyright (c) 2012 ExactTarget
 */

var $ = window.$;

$(window).ready(function(){
    var CKEDITOR = window.CKEDITOR;

    CKEDITOR.disableAutoInline = true;

    var editor = CKEDITOR.inline( 'example' );
});