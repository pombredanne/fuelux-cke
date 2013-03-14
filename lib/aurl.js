/**
 * Absolute url finder plugin
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
            //img.src = null;  //perhaps have this here?
            img = null;
            load(path);
        }
    }
});