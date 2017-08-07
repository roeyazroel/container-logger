'use strict';
class Logger {
  constructor() {
    if (this.constructor === Logger) {
      throw new TypeError("Can not construct Logger class.");
    }
    if (this.log === Logger.prototype.log) {
      throw new TypeError("Please implement Logger method foo.");
    }
  }
  log(containerId, message) {
    throw new TypeError("Do not call Logger method foo from child.");
  }
}

module.exports = Logger;