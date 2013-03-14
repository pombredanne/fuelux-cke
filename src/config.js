define(function (require) {
    require('fuelux-ckeditor/ckeditor/ckeditor');

    var config = CKEDITOR.config;
    var dirUrl = require('aurl!fuelux-ckeditor/dir.gif');

    CKEDITOR.fuelux_extensions = {
        directory: dirUrl.split('dir.gif')[0]
    };

    config.extraPlugins = 'onchange,timestamp';
    config.toolbar = 'FuelUX_Default';
    config.toolbar_FuelUX_Default = [
        { name: 'fonts', items : [ 'Font'] },
        { name: 'fontSizes', items : [ 'FontSize' ] },
        { name: 'bold', items : [ 'Bold'] },
        { name: 'italic', items : [ 'Italic'] },
        { name: 'underline', items : [ 'Underline' ] },
        { name: 'fontColor', items : [ 'TextColor' ] },
        { name: 'alignment', items : [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
        '/',
        { name: 'numList', items : [ 'NumberedList'] },
        { name: 'bulletList', items : [ 'BulletedList' ] },
        { name: 'link', items : [ 'Link' ] },
        { name: 'image', items : [ 'Image' ] }
    ];

    return CKEDITOR;
});

