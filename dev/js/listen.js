function listenElement() {
  var args = Array.prototype.slice.call(arguments),
    element = args.shift();
  element.addEventListener.apply(element, args)
}

function listenBody(eventName, selector, handler) {
  listenElement(
    document.body,
    eventName,
    function(event) {
      if (event.target.matches(selector)) {
        return handler(event);
      }
    },
    false
  )
}

function listenWindow(eventName, selector, handler) {
  listenElement(
    window,
    eventName,
    function(event) {
      if (event.target.matches(selector)) {
        return handler(event);
      }
    },
    false
  )
}

module.exports = {
  listenElement: listenElement,
  listenBody: listenBody,
  listenWindow: listenWindow
};