/*
 * Fuel UX CKeditor - Loader Bundle
 * https://github.com/ExactTarget/fuelux-ckeditor
 *
 * Copyright (c) 2012 ExactTarget
 */

define('jquery', [], function () { return window.jQuery; });

define('ckeditor', [], function () { return window.CKEDITOR; });

define('fuelux-ckeditor/loader', ['fuelux-ckeditor/all'], function () {});

require('fuelux-ckeditor/loader');