
module.exports = function(name1, name2) {
  return Promise.join(this.resolveUpperCase(name1), this.resolveUpperCase(name2));
};
