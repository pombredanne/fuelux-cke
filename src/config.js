define(function (require) {
    require('fuelux-ckeditor/ckeditor/ckeditor');

    var config = CKEDITOR.config;
    var dirUrl = require('aurl!fuelux-ckeditor/dir.gif').split('dir.gif')[0];

    CKEDITOR.fuelux = {
        directory: dirUrl
    };

    config.extraPlugins = 'onchange,timestamp';
    config.skin = 'fuelux-editor,' + dirUrl + 'skins/fuelux-ckeditor/';

    return CKEDITOR;
});

