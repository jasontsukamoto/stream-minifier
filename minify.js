var fs = require('fs');
var Transform = require('stream').Transform;
var util = require('util');
var argv = require('minimist')(process.argv.slice(2));
var readPath = argv.input.toString();
var writePath = argv.output.toString();

var input = fs.createReadStream(readPath, { encoding : 'utf8' });

var output = fs.createWriteStream(writePath, { encoding : 'utf8' });

var TransformStream = function() {
  Transform.call(this);
}
util.inherits(TransformStream, Transform);
TransformStream.prototype._transform = function(chunk, encoding, callback) {
  var chunkString = chunk.toString();
  var minified = chunkString.replace(/(\s|\n|\r|\t)+/gm, '');
  this.push(minified);
};

var ts = new TransformStream();


input.pipe(ts).pipe(output);
