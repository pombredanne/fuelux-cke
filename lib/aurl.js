/**
 * RequireJS aurl plugin 1.0.0 Copyright (c) 2013 Kevin Parkerson
 * Available via the MIT or new BSD license.
 * see: https://github.com/kevinparkerson/requirejs-aurl for details
 */

define({
    load: function(name, req, load, config){
        var img, path;
        if(config.isBuild){
            load();
        }else{
            path = req.toUrl(name);
            img = document.createElement('img');
            img.src = path;
            path = img.src;
            img.src = null;
            img = null;
            load(path);
        }
    }
});
