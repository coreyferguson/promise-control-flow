
'use strict';

class NodeJsClient {

  /**
   * TODO
   */
  resolveUpperCase(name, callback) {
    if (name === null || name === undefined || name === '') {
      callback(new Error('Illegal argument: missing required argument, `name`.'));
    } else {
      callback(null, name.toUpperCase());
    }
  }

}

module.exports = new NodeJsClient();
