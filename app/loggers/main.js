var singleton = function singleton() {
	var logger;
	this.start = function () {
		switch (process.env.logger) {
			case "file":
				var FileLogger = require('./file')
				logger = new FileLogger();
				break;
			case "elasticsearch":
				var ElasticSearchLogger = require('./elasticsearch')
				logger = new ElasticSearchLogger();
				break;
			default:
				var FileLogger = require('./file')
				logger = new FileLogger();
				break;
		}
	}

	this.log = function (containerId, message) {
		logger.log(containerId, message)
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