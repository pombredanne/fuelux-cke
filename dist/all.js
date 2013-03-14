
/**
 * Absolute url finder plugin
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
            //img.src = null;  //perhaps have this here?
            img = null;
            load(path);
        }
    }
});
define('fuelux-ckeditor/config',['require','fuelux-ckeditor/ckeditor/ckeditor','aurl!fuelux-ckeditor/dir.gif'],function (require) {
    require('fuelux-ckeditor/ckeditor/ckeditor');

    var config = CKEDITOR.config;
    var directory = require('aurl!fuelux-ckeditor/dir.gif').split('dir.gif')[0];

    //PLUGINS
    CKEDITOR.plugins.addExternal('onchange', directory + 'plugins/onchange/', 'plugin.js');

    config.extraPlugins = 'onchange';


    //SKINS
    config.skin = 'fuelux-editor,' + directory + 'skins/fuelux-ckeditor/';

    return CKEDITOR;
});


/*
 * Fuel UX CKeditor - All
 * https://github.com/ExactTarget/fuelux-editor
 *
 * Copyright (c) 2013 ExactTarget
 */

define('fuelux-ckeditor/all',['require','fuelux-ckeditor/config'],function (require) {

    require('fuelux-ckeditor/config');

});
