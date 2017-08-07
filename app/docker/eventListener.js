var Docker = require('dockerode');
var stream = require('stream');
var logger = require('../loggers/main')
var singleton = function singleton() {

	var docker = new Docker({
		socketPath: '/var/run/docker.sock'
	});

	this.start = function () {
		// filter doesn't work
		docker.getEvents({
			filter: {
				event: "start" 
			}
		}).then(event => {
			event.setEncoding('utf8');
			event.on('data', json => {
				let data = JSON.parse(json);
				if (data.Type == 'container' && data.Action == 'start') {
					isValidContainer(data.id, function (err, isValid) {
						if (!err && isValid) {
							logger.log(data.id, '!start!\n')
							handler(docker.getContainer(data.id))
						}
					})
				}
			});
		}).catch(() =>
			console.error('Failed to attach docker event listener.')
		);
	}

	function isValidContainer(containerId, cb) {
		container = docker.getContainer(containerId)
		container.inspect(function (err, data) {
			if (err) {
				console.error(err)
				cb(err, false)
			} else {
				if (data.Config.Labels.logger == "true")
					cb(null, true)
				else
					cb(null, false)
			}
		})
	}

	function handler(container) {
		var logStream = new stream.PassThrough();
		logStream.on('data', function (chunk) {
			logger.log(container.id, chunk.toString('utf8'))
		});
		container.attach({
			stream: true,
			stdout: true,
			stderr: true,
			logs: true
		}, function (err, stream) {
			if (err) {
				console.error(err.message);
			} else {
				container.modem.demuxStream(stream, logStream, logStream);
				stream.on('end', function () {
					logger.log(container.id, '!stop!\n');
				});
				setTimeout(function () {
					stream.destroy();
				}, 2000);
			}
		})
	}


}
singleton.instance = null;

singleton.getInstance = function () {
	if (this.instance === null) {
		this.instance = new singleton();
	}
	return this.instance;
};


module.exports = singleton.getInstance();