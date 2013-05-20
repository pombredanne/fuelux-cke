/*global define, CKEDITOR */
define(['require','fuelux-cke/ckeditor/ckeditor','fuelux-cke/dir'],function (require) {
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
