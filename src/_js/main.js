// import Schwifty from './schwifty';
import { watchBeforeAfterModules } from './_beforeafter';
import Coarse from './_coarse';
import { watchForms } from './_forms';
import { initParallax } from './_parallax';
import { $$ } from './_utils';

function init() {

  watchForms();
  watchBeforeAfterModules();
  initParallax($$('[data-parallax]'));
  $$('.carousel').forEach(carousel =>
    new Coarse(carousel,
      {
        renderControls: false,
        autoScroll: 4000,
        swipeSensitivity: .8
      }
    ));
}

init();

// new Schwifty({
//   preserveScroll: false,
//   onload: init
// })