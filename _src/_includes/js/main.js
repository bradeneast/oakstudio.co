import { watchBeforeAfterModules } from './_beforeafter';
import Coarse from './_coarse';
import { watchForms } from './_forms';
import observer from './_observer';
import { initParallax } from './_parallax';
import { $$, attr } from './_utils';

function init() {

  let parallaxItems = $$('[data-parallax]');
  let animatedItems = $$('[data-animate]');
  let carousels = $$('.carousel');

  watchForms();
  watchBeforeAfterModules();

  carousels.forEach(carousel => {
    let renderControls = attr(carousel, 'data-controls');
    let renderDots = attr(carousel, 'data-dots');
    let scrollTime = attr(carousel, 'data-scrollTime');
    new Coarse(carousel,
      {
        renderDots: renderDots == undefined ? true : renderDots,
        renderControls: renderControls || false,
        autoScroll: scrollTime == undefined ? 4000 : scrollTime,
        swipeSensitivity: .8
      }
    )
  })

  animatedItems.forEach(elem => observer.observe(elem));
  initParallax(parallaxItems);
}

init();