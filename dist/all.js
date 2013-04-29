(function () {
define('fuelux-cke/dir',['module'], function (module) {
    var path = module.uri.replace('dir.js', 'dir.gif');
    var img = document.createElement('img');
    img.src = path;
    path = img.src;
    img = null;
    return path;
});
define('fuelux-cke/config',['require','fuelux-cke/ckeditor/ckeditor','fuelux-cke/dir'],function (require) {
    require('fuelux-cke/ckeditor/ckeditor');

    var config = CKEDITOR.config;
    var directory = require('fuelux-cke/dir').split('dir.gif')[0];

    //PLUGINS
    CKEDITOR.plugins.addExternal('onchange', directory + 'plugins/onchange/', 'plugin.js');

    config.extraPlugins = 'onchange';

    //SKINS
    config.skin = 'fuelux-cke,' + directory + 'skins/fuelux-cke/';

    return CKEDITOR;
});


/*
 * Fuel UX CKE - All
 * https://github.com/ExactTarget/fuelux-editor
 *
 * Copyright (c) 2013 ExactTarget
 */

define('fuelux-cke/all',['require','fuelux-cke/config'],function (require) {

    require('fuelux-cke/config');

});
}());