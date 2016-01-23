
module.exports = function(names) {
  return Promise.mapSeries(names, function(name) {
    return this.resolveUpperCase(name);
  }.bind(this));
};
