
module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(name.toUpperCase());
    }, 50);
  });
};
