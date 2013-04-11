define(['module'], function (module) {
    var path = module.uri;
    var img = document.createElement('img');
    img.src = path;
    path = img.src;
    img.src = null;
    img = null;
    return path;
});