/**@returns {Number} */
export let round = (x, places = 0) =>
  places
    ? Math.round(x * 10 * places) / (10 * places)
    : Math.round(x);

/**@returns {HTMLElement} */
export let $ = (selector, context = document) => context.querySelector(selector);

/**@returns {NodeList} */
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

/**@returns {String} */
export let attr = (element, attributeName) => element.getAttribute(attributeName);

let lastFrame = 0;
export let debounce = (callback) => requestAnimationFrame(thisFrame => {
  if (thisFrame - lastFrame > 10) {
    lastFrame = thisFrame;
    callback();
  }
})

export let setProp = (elem, propName, propValue) => elem.style.setProperty(`--${propName}`, propValue);