import Schwifty from './schwifty';
import Coarse from './_coarse';
import { watchForms } from './_forms';
import { initParallax } from './_parallax';
import { $$ } from './_utils';

function init() {
  initParallax($$('[data-parallax]'));
  watchForms();
  $$('.carousel').forEach(carousel =>
    new Coarse(
      carousel,
      {
        renderControls: false,
        autoScroll: 5000
      }
    )
  );
}

init();

// new Schwifty({
//   preserveScroll: false,
//   onload: init
// })