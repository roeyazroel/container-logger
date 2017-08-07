var dockerHandler = require('./app/docker/eventListener')

dockerHandler.start();

var logger = require('./app/loggers/main')

process.env.LOGGER_PATH = __dirname + '/logs/'

logger.start()