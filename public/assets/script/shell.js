var ip = require('ip');
var os = require('os');
console.log('Server IP: ' + ip.address());
var net = os.hostname();
console.dir(net);
//alert(net);
//console.log(require('shelljs').exec('hostname'));