import { watchBeforeAfterModules } from "./_beforeafter.js";
import Coarse from "./_coarse.js";
import { watchForms } from "./_forms.js";
import observer from "./_observer.js";
import { initParallax } from "./_parallax.js";
import { $$, attr } from "./_utils.js";

function init() {

  let parallaxItems = $$("[data-parallax]");
  let animatedItems = $$("[data-animate]");
  let carousels = $$(".carousel");

  watchForms();
  watchBeforeAfterModules();

  carousels.forEach(carousel => {
    let renderControls = attr(carousel, "data-controls");
    let renderDots = attr(carousel, "data-dots");
    let scrollTime = attr(carousel, "data-scrollTime");
    new Coarse(carousel,
      {
        renderDots: renderDots == undefined ? true : renderDots,
        renderControls: renderControls || false,
        autoScroll: scrollTime == undefined ? 4000 : scrollTime,
        swipeSensitivity: .8
      }
    )
  })

  // @ts-ignore
  animatedItems.forEach(elem => observer.observe(elem));
  initParallax(parallaxItems);
}

init();