(function () {
define('fuelux-cke/dir',['module'], function (module) {
    var path = module.uri.replace('dir.js', 'dir.gif');
    var img = document.createElement('img');
    img.src = path;
    path = img.src;
    img = null;
    return path;
});
/*global define, CKEDITOR */
define('fuelux-cke/config',['require','fuelux-cke/ckeditor/ckeditor','fuelux-cke/dir'],function (require) {
	require('fuelux-cke/ckeditor/ckeditor');

	var config = CKEDITOR.config;
	var directory = require('fuelux-cke/dir').split('dir.gif')[0];

	//PLUGINS
	var allPlugins = [
		'onchange',
		'scayt'
	];

	var i;
	var len = allPlugins.length;
	var current;

	for (i = 0; i < len; i++) {
		current = allPlugins[i];
		CKEDITOR.plugins.addExternal(
			current,
			directory + 'plugins/' + current + '/',
			'plugin.js'
		);
	}

	config.extraPlugins = allPlugins.join(',');

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