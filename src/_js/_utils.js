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
export let attr = (element, attributeName) => {
  let a = element.getAttribute(attributeName);
  if (a) return JSON.parse(a);
}

let lastFrame = 0;
export let debounce = (callback) => requestAnimationFrame(thisFrame => {
  if (thisFrame - lastFrame > 10) {
    lastFrame = thisFrame;
    callback();
  }
})

export let setProp = (elem, propName, propValue) => elem.style.setProperty(`--${propName}`, propValue);

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};