/**@returns {Number} */
export let round = x => Math.round(x);

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