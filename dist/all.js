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

	config.scayt_srcUrl = 'https://app.s1.exct.net/spellcheck/lf/scayt/scayt.js';
//	config.scayt_customerid = '1:TP9O44-I3npX3-BzRrT3-phukM-Z3MLc2-C54oN1-4dqFI2-csepO1-SJ2yh1-eGvAg4';
	config.scayt_autoStartup = true;
	config.scayt_maxSuggestions = 4;
	config.scayt_sLang ="en_US";
	config.scayt_moreSuggestions = 'on';
	config.scayt_contextCommands = 'add|ignoreall';
	config.scayt_uiTabs = '1,0,1';
	config.scayt_contextMenuItemsOrder ='moresuggest|control|suggest';

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