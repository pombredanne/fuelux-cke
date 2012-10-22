/*
 * Fuel UX Editor - All Bundle
 * https://github.com/ExactTarget/fuelux-editor
 *
 * Copyright (c) 2012 ExactTarget
 */

define(function (require) {
    /*** Libraries ***/
    require('backbone-fe');
    require('fuelux/all');
    require('globalize');
    require('handlebars');
    require('jquery-fe');
    require('text');
    require('tmpl');
    require('underscore-fe');

    /*** Editor ***/

        /*** Core ***/
        require('core/core-c-base');
        require('core/core-m-base');
        require('core/core-m-editor');
        require('core/core-v-api');
        require('core/core-v-base');
        require('core/core-v-editor');

        /*** Parts ***/

        require('parts/parts-v-menu');

        /*** Modules ***/

        /*** Submodules ***/
});
