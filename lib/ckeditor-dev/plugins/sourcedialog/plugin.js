﻿/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'sourcedialog', {
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sq,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%
	icons: 'sourcedialog,sourcedialog-rtl', // %REMOVE_LINE_CORE%

	init: function( editor ) {
		// Register the "source" command, which simply opens the "source" dialog.
		editor.addCommand( 'sourcedialog', new CKEDITOR.dialogCommand( 'sourcedialog' ) );

		// Register the "source" dialog.
		CKEDITOR.dialog.add( 'sourcedialog', this.path + 'dialogs/sourcedialog.js' );

		// If the toolbar is available, create the "Source" button.
		if ( editor.ui.addButton ) {
			editor.ui.addButton( 'Sourcedialog', {
				label: editor.lang.sourcedialog.toolbar,
				command: 'sourcedialog',
				toolbar: 'mode,10'
			});
		}
	}
});
