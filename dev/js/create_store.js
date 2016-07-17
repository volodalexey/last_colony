module.exports = function(reducer, initialState) {
  var
    listeners = [],
    state = initialState || {};
  return {
    /**
     * notify all stores about state change
     */
    dispatch: function(change) {
      state = reducer(state, change) || state;
      listeners.forEach(function(listener) {
        listener(state);
      });
    },

    /**
     * get state
     */
    getState: function() {
      return state;
    },

    /**
     * subscribe for state change
     */
    subscribe: function(listener) {
      listeners.push(listener);
    }
  };
};