import Schwifty from './schwifty';
import Coarse from './_coarse';
import { watchForms } from './_forms';
import { initParallax } from './_parallax';
import { $$ } from './_utils';

function init() {

  watchForms();

  initParallax($$('[data-parallax]'));

  $$('.carousel').forEach(carousel =>
    new Coarse(carousel,
      {
        renderControls: false,
        autoScroll: 5000,
        swipeSensitivity: .9
      }
    ));
}

init();

// new Schwifty({
//   preserveScroll: false,
//   onload: init
// })