/*global define, CKEDITOR */
define(function (require) {
	require('fuelux-cke/ckeditor/ckeditor');

	var config = CKEDITOR.config;
	var directory = require('fuelux-cke/dir').split('dir.gif')[0];

	//PLUGINS
	var allPlugins = [
		'onchange'
	];

	var len = allPlugins.length;
	var current, i;

	for (i = 0; i < len; i++) {
		current = allPlugins[i];
		CKEDITOR.plugins.addExternal(current, directory + 'plugins/' + current + '/', 'plugin.js');
	}

	config.extraPlugins = allPlugins.join(',');


	//SKINS
	config.skin = 'fuelux-cke,' + directory + 'skins/fuelux-cke/';

	return CKEDITOR;
});
