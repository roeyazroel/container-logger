var Logger = require('./logger')

class ElasticSearchLogger extends Logger {
  
  constructor() {
	super();
		    console.log('ElasticSearchLogger.prototype.constructor');

  }
  log(containerId, message) {
    console.log('ElasticSearchLogger.prototype.log');
  }
}

module.exports = ElasticSearchLogger