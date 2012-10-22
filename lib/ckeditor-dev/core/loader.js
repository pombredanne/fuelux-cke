﻿/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/**
 * @fileOverview Defines the {@link CKEDITOR.loader} objects, which is used to
 *		load core scripts and their dependencies from _source.
 */

if ( typeof CKEDITOR == 'undefined' )
	CKEDITOR = {};

if ( !CKEDITOR.loader ) {
	/**
	 * Load core scripts and their dependencies from _source.
	 *
	 * @class
	 * @singleton
	 */
	CKEDITOR.loader = (function() {
		// Table of script names and their dependencies.
		var scripts = {
			'_bootstrap': [ 'config', 'creators/inline', 'creators/themedui', 'editable', 'ckeditor', 'plugins', 'scriptloader', 'style', 'tools', /* The following are entries that we want to force loading at the end to avoid dependence recursion */ 'dom/comment', 'dom/elementpath', 'dom/text', 'dom/rangelist', 'skin' ],
			'ckeditor': [ 'ckeditor_basic', 'dom', 'dtd', 'dom/document', 'dom/element', 'dom/iterator', 'editor', 'event', 'htmldataprocessor', 'htmlparser', 'htmlparser/element', 'htmlparser/fragment', 'htmlparser/filter', 'htmlparser/basicwriter', 'template', 'tools' ],
			'ckeditor_base': [],
			'ckeditor_basic': [ 'editor_basic', 'env', 'event' ],
			'command': [],
			'config': [ 'ckeditor_base' ],
			'dom': [],
			'dom/comment': [ 'dom/node' ],
			'dom/document': [ 'dom/node', 'dom/window' ],
			'dom/documentfragment': [ 'dom/element' ],
			'dom/element': [ 'dom', 'dom/document', 'dom/domobject', 'dom/node', 'dom/nodelist', 'tools' ],
			'dom/elementpath': [ 'dom/element' ],
			'dom/event': [],
			'dom/iterator': [ 'dom/range' ],
			'dom/node': [ 'dom/domobject', 'tools' ],
			'dom/nodelist': [ 'dom/node' ],
			'dom/domobject': [ 'dom/event' ],
			'dom/range': [ 'dom/document', 'dom/documentfragment', 'dom/element', 'dom/walker' ],
			'dom/rangelist': [ 'dom/range' ],
			'dom/text': [ 'dom/node', 'dom/domobject' ],
			'dom/walker': [ 'dom/node' ],
			'dom/window': [ 'dom/domobject' ],
			'dtd': [ 'tools' ],
			'editable': [ 'editor', 'tools' ],
			'editor': [ 'command', 'config', 'editor_basic', 'focusmanager', 'keystrokehandler', 'lang', 'plugins', 'tools', 'ui' ],
			'editor_basic': [ 'event' ],
			'env': [],
			'event': [],
			'focusmanager': [],
			'htmldataprocessor': [ 'htmlparser', 'htmlparser/basicwriter', 'htmlparser/fragment', 'htmlparser/filter' ],
			'htmlparser': [],
			'htmlparser/comment': [ 'htmlparser' ],
			'htmlparser/element': [ 'htmlparser', 'htmlparser/fragment' ],
			'htmlparser/fragment': [ 'htmlparser', 'htmlparser/comment', 'htmlparser/text', 'htmlparser/cdata' ],
			'htmlparser/text': [ 'htmlparser' ],
			'htmlparser/cdata': [ 'htmlparser' ],
			'htmlparser/filter': [ 'htmlparser' ],
			'htmlparser/basicwriter': [ 'htmlparser' ],
			'keystrokehandler': [ 'event' ],
			'lang': [],
			'plugins': [ 'resourcemanager' ],
			'resourcemanager': [ 'scriptloader', 'tools' ],
			'scriptloader': [ 'dom/element', 'env' ],
			'selection': [ 'dom/range', 'dom/walker' ],
			'skin': [],
			'style': [ 'selection' ],
			'template': [],
			'tools': [ 'env' ],
			'ui': [],
			'creators/themedui': [],
			'creators/inline': []
		};

		var basePath = (function() {
			// This is a copy of CKEDITOR.basePath, but requires the script having
			// "_source/loader.js".
			if ( CKEDITOR && CKEDITOR.basePath )
				return CKEDITOR.basePath;

			// Find out the editor directory path, based on its <script> tag.
			var path = '';
			var scripts = document.getElementsByTagName( 'script' );

			for ( var i = 0; i < scripts.length; i++ ) {
				var match = scripts[ i ].src.match( /(^|.*?[\\\/])(?:_source\/)?core\/loader.js(?:\?.*)?$/i );

				if ( match ) {
					path = match[ 1 ];
					break;
				}
			}

			// In IE (only) the script.src string is the raw valued entered in the
			// HTML. Other browsers return the full resolved URL instead.
			if ( path.indexOf( '://' ) == -1 ) {
				// Absolute path.
				if ( path.indexOf( '/' ) === 0 )
					path = location.href.match( /^.*?:\/\/[^\/]*/ )[ 0 ] + path;
				// Relative path.
				else
					path = location.href.match( /^[^\?]*\// )[ 0 ] + path;
			}

			return path;
		})();

		var timestamp = ( CKEDITOR && CKEDITOR.timestamp ) || ( new Date() ).valueOf(); // %REMOVE_LINE%
		/*																				// %REMOVE_LINE%
		 * The production implementation contains a fixed timestamp						// %REMOVE_LINE%
		 * generated by the releaser													// %REMOVE_LINE%
		var timestamp = '%TIMESTAMP%';
		 */ // %REMOVE_LINE%

		var getUrl = function( resource ) {
				if ( CKEDITOR && CKEDITOR.getUrl )
					return CKEDITOR.getUrl( resource );

				return basePath + resource + ( resource.indexOf( '?' ) >= 0 ? '&' : '?' ) + 't=' + timestamp;
			};

		var pendingLoad = [];

		return {
			/**
			 * The list of loaded scripts in their loading order.
			 *
			 *		// Alert the loaded script names.
			 *		alert( CKEDITOR.loader.loadedScripts );
			 */
			loadedScripts: [],
			/**
			 * Table of script names and their dependencies.
			 *
			 * @property {Array}
			 */
			scripts: scripts,

			/**
			 * @todo
			 */
			loadPending: function() {
				var scriptName = pendingLoad.shift();

				if ( !scriptName )
					return;

				var scriptSrc = getUrl( 'core/' + scriptName + '.js' );

				var script = document.createElement( 'script' );
				script.type = 'text/javascript';
				script.src = scriptSrc;

				function onScriptLoaded() {
					// Append this script to the list of loaded scripts.
					CKEDITOR.loader.loadedScripts.push( scriptName );

					// Load the next.
					CKEDITOR.loader.loadPending();
				}

				// We must guarantee the execution order of the scripts, so we
				// need to load them one by one. (#4145)
				// The following if/else block has been taken from the scriptloader core code.
				if ( typeof( script.onreadystatechange ) !== "undefined" ) {
					/** @ignore */
					script.onreadystatechange = function() {
						if ( script.readyState == 'loaded' || script.readyState == 'complete' ) {
							script.onreadystatechange = null;
							onScriptLoaded();
						}
					};
				} else {
					/** @ignore */
					script.onload = function() {
						// Some browsers, such as Safari, may call the onLoad function
						// immediately. Which will break the loading sequence. (#3661)
						setTimeout( function() {
							onScriptLoaded( scriptName );
						}, 0 );
					};
				}

				document.body.appendChild( script );
			},

			/**
			 * Loads a specific script, including its dependencies. This is not a
			 * synchronous loading, which means that the code to be loaded will
			 * not necessarily be available after this call.
			 *
			 *		CKEDITOR.loader.load( 'dom/element' );
			 *
			 * @param {String} scriptName
			 * @param {Boolean} [defer=false]
			 * @todo params
			 */
			load: function( scriptName, defer ) {
				// Check if the script has already been loaded.
				if ( scriptName in this.loadedScripts )
					return;

				// Get the script dependencies list.
				var dependencies = scripts[ scriptName ];
				if ( !dependencies )
					throw 'The script name"' + scriptName + '" is not defined.';

				// Mark the script as loaded, even before really loading it, to
				// avoid cross references recursion.
				this.loadedScripts[ scriptName ] = true;

				// Load all dependencies first.
				for ( var i = 0; i < dependencies.length; i++ )
					this.load( dependencies[ i ], true );

				var scriptSrc = getUrl( 'core/' + scriptName + '.js' );

				// Append the <script> element to the DOM.
				// If the page is fully loaded, we can't use document.write
				// but if the script is run while the body is loading then it's safe to use it
				// Unfortunately, Firefox <3.6 doesn't support document.readyState, so it won't get this improvement
				if ( document.body && ( !document.readyState || document.readyState == 'complete' ) ) {
					pendingLoad.push( scriptName );

					if ( !defer )
						this.loadPending();
				} else {
					// Append this script to the list of loaded scripts.
					this.loadedScripts.push( scriptName );

					document.write( '<script src="' + scriptSrc + '" type="text/javascript"><\/script>' );
				}
			}
		};
	})();
}

// Check if any script has been defined for autoload.
if ( CKEDITOR._autoLoad ) {
	CKEDITOR.loader.load( CKEDITOR._autoLoad );
	delete CKEDITOR._autoLoad;
}