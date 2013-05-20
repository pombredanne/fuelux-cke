/*global CKEDITOR */
CKEDITOR.plugins.add('scayt', {
	init: function (editor) {

		// For SCAYT Licensed version
		editor.config.scayt_srcUrl = 'https://app.s4.exct.net/spellcheck/lf/scayt/scayt.js';

		// evaluate SCAYT on startup
		editor.config.scayt_autoStartup = true;

		// set up max suggestion count in context menu
		// all other words will be present in "More Suggestions" sub menu
		editor.config.scayt_maxSuggestions = 4;

		// set up SCAYT default language
		editor.config.scayt_sLang ="en_US";

		// set up dictionaries	(only for Licensed version)
		// editor.config.scayt_userDictionaryName = "MyUserDictionaryName";
		// editor.config.scayt_customDictionaryIds = "CustomDictionaryID";

		// enable/disable the "More Suggestions" sub-menu in the context menu.
		// The possible values are "on" or "off".
		editor.config.scayt_moreSuggestions = 'off';

		// customize the display of SCAYT context menu commands ("Add Word", "Ignore"
		// and "Ignore All"). It must be a string with one or more of the following
		// words separated by a pipe ("|"):
		// "off": disables all options.
		// "all": enables all options.
		// "ignore": enables the "Ignore" option.
		// "ignoreall": enables the "Ignore All" option.
		// "add": enables the "Add Word" option.
		editor.config.scayt_contextCommands = 'add|ignoreall';

		// set the visibility of the SCAYT tabs in the settings dialog and toolbar
		// button. The value must contain a "1" (enabled) or "0" (disabled) number for
		// each of the following entries, in this precise order, separated by a
		// comma (","): "Options", "Languages" and "Dictionary".
		editor.config.scayt_uiTabs = '1,0,1';

		// Define order of placing of SCAYT context menu items by groups.
		// It must be a string with one or more of the following
		// words separated by a pipe ("|"):
		// 'suggest' - main suggestion word list
		// 'moresuggest' - more suggestions word list
		// 'control' - SCAYT commands, such as 'Ignore' and 'Add Word'
		editor.config.scayt_contextMenuItemsOrder ='moresuggest|control|suggest';
	}
});