define(['module'], function (module) {
    var path = module.uri.replace('dir.js', 'dir.gif');
    var img = document.createElement('img');
    img.src = path;
    path = img.src;
    img = null;
    return path;
});