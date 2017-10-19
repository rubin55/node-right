'use strict';

const
    fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];


if(!filename) {
    throw Error('A filename to watch needs to be specified');
}

fs.watch(filename, function() {
    let
        ls = spawn('cmd.exe', ['/c', 'dir', filename]),
        output = '';

    ls.stdout.on('data', function(chunk) {
        console.log("Received a data chunk..");
        output += chunk.toString();
    });

    ls.on('close', function() {
        console.log("Received a close event, let's do something with output..");

        let parts = output.split(/\s+/);
        console.dir([parts[1], parts[2], parts[3]]);
    });
});

console.log('Watching ' + filename + ' for changes..')
