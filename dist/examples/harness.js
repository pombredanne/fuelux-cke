/*
 * Fuel UX CKeditor (Example Harness)
 * https://github.com/ExactTarget/fuelux-ckeditor
 *
 * Copyright (c) 2012 ExactTarget
 */

require.config({ baseUrl: '../' });

require(['jquery', 'fuelux-ckeditor/all'], function($){
    var CKEDITOR = window.CKEDITOR;

    CKEDITOR.disableAutoInline = true;

    var editor = CKEDITOR.inline( 'example' );
});
