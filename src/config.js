define(function (require) {
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

