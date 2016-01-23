
module.exports = function(number, name) {
  var promises = [];
  for (var i=0; i<number; i++) {
    promises.push(this.resolveUpperCase(name));
  }
  return Promise.all(promises);
};
