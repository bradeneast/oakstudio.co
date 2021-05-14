export let round = x => Math.round(x);

/**@returns {HTMLElement} */
export let $ = (selector, context = document) => context.querySelector(selector);

/**@returns {NodeList} */
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

export let attr = (element, attributeName) => element.getAttribute(attributeName);