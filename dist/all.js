(function () {
/**
 * RequireJS aurl plugin 1.0.0 Copyright (c) 2013 Kevin Parkerson
 * Available via the MIT or new BSD license.
 * see: https://github.com/kevinparkerson/requirejs-aurl for details
 */

define('aurl',{
    load: function(name, req, load, config){
        var img, path;
        if(config.isBuild){
            load();
        }else{
            path = req.toUrl(name);
            img = document.createElement('img');
            img.src = path;
            path = img.src;
            img.src = null;
            img = null;
            load(path);
        }
    }
});

define('fuelux-cke/config',['require','fuelux-cke/ckeditor/ckeditor','aurl!fuelux-cke/dir.gif'],function (require) {
    require('fuelux-cke/ckeditor/ckeditor');

    var config = CKEDITOR.config;
    var directory = require('aurl!fuelux-cke/dir.gif').split('dir.gif')[0];

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