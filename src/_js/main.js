import Schwifty from './schwifty';
import { watchForms } from './_forms';
import { watchParallax } from './_parallax';
import { $$, debounce, round } from './_utils';

function init() {
  watchParallax($$('.parallax'));
  watchForms();
}

init();

// new Schwifty({
//   preserveScroll: false,
//   onload: init
// })