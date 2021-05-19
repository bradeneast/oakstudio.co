import Schwifty from './schwifty';
import { watchForms } from './_forms';
import { initParallax } from './_parallax';
import { $$ } from './_utils';

function init() {
  initParallax($$('[data-parallax]'));
  watchForms();
}

init();

// new Schwifty({
//   preserveScroll: false,
//   onload: init
// })