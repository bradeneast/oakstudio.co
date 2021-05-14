export let round = x => Math.round(x);

export let $ = (selector, context = document) => context.querySelector(selector);

export let $$ = (selector, context = document) => context.querySelectorAll(selector);