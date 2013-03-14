define(['require','fuelux-ckeditor/ckeditor/ckeditor','aurl!fuelux-ckeditor/dir.gif'],function (require) {
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

