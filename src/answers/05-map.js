
module.exports = function(names) {
  return Promise.map(names, function(name) {
    return this.resolveUpperCase(name);
  }.bind(this));
};
