'use strict' 

var Stream = require('stream');
var Path = require('path');

function gulpChangeName(input) {
    var steam = new Stream.Transform({objectMode: true});

    steam._transform = function(originalFile, encode, callback ) {
        var file = originalFile.clone({content: true});
        var resultPath;
        
        if ((typeof input === 'string' || typeof input === 'number') && input !== '') {
          resultPath = Path.basename(file.relative).slice(0,Path.basename(file.relative).indexOf('.')) + '.' + input + Path.extname(file.relative);
          file.path = Path.join(file.base, resultPath);
          
        } else if (input === null || input === undefined) {
          resultPath = Path.basename(file.relative).slice(0,Path.basename(file.relative).indexOf('.')) + '.' + new Date().getTime() + Path.extname(file.relative);
          file.path = Path.join(file.base, resultPath);
          
        } else {
          callback(new Error('Unsupported renaming parameter type supplied'), undefined);
          return;
        }

        callback(null, file);        
    }

    return steam;
}

module.exports = gulpChangeName;