module.exports = function(keys) {
  return Object.keys(keys).reduce(
    (key_a, key_b) => {
      let total = {};
      if (typeof key_a === 'object') {
        total = key_a;
      } else {
        total[key_a] = key_a;
      }
      total[key_b] = key_b;
      return total;
    }
  )
};