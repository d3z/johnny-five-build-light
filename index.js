var five = require('johnny-five');
var board = new five.Board();

var rdb;

board.on('ready', function() {
    // Create an RGB LED ([RedPin, GreenPin, BluePin])
    rgb = new five.Led.RGB([9, 10, 11]);

    // Set the color and switch between on/off every 500ms
    rgb.color('#2a1c31');
    rgb.strobe(500);
});

var http = require('http');

var server = http.createServer(function(req, res) {
    if (!rgb) {
        res.end('No board found');
    }

    var url = req.url.toLowerCase();
    if (url.indexOf('/events/build/started') == 0) {
        rgb.color('#FFFF00');
        res.end('Build started');
    } else if (url.indexOf('/events/build/succeeded') == 0) {
        rgb.color('#00FF00');
        res.end('Build successful');
    } else if (url.indexOf('/events/build/failed') == 0) {
        rgb.color('#FF0000');
        res.end('Build failed');
    } else {
        res.end('Unknown event');
    }
}).listen(8000);
console.log('Server is listening on port 8000');
