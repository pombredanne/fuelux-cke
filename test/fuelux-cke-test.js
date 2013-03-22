/*global require:false, QUnit:false, module:false, test:false, asyncTest:false, expect:false,
  start:false, stop:false, ok:false, equal:false, notEqual:false, deepEqual:false,
  notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false */

require.config({
    baseUrl: '../',
    paths: {
        'jquery': 'lib/jquery'
    }
});

require(['jquery'], function($) {
    module('Fuel UX CKE', {
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('empty string should be equal to empty string', function() {
        strictEqual('', '', 'empty string should be equal to empty string');
    });
});