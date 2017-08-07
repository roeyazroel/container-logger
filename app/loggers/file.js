var Logger = require('./logger')
var fs = require('fs')
var moment = require('moment')
var logStream;

class FileLogger extends Logger {

	constructor() {
		super();
		console.log('FileLogger.prototype.constructor')
		var fileName = moment().format("YYYY-MM-DD") + '.log'
		logStream = fs.createWriteStream(process.env.LOGGER_PATH + fileName, {'flags': 'a'});

	}
	log(containerId, message) {
		console.log(message);
		logStream.write(moment().toISOString() + ' - ' + containerId + ': ' + message)
	}
}

module.exports = FileLogger