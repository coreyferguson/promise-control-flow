
module.exports = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('oops, something bad happened'));
    }, 50);
  });
};
