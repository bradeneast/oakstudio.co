import { $$, attr } from "./_includes/_js/utils.js";
import { watchBeforeAfterModules } from "./_includes/_js/beforeafter.js";
import { watchForms } from "./_includes/_js/forms.js";
import observer from "./_includes/_js/observer.js";
// Library imports
import Rellax from "./_includes/_js/libs/rellax.js";
import Coarse from "./_includes/_js/libs/coarse.js";
import Schwifty from "./_includes/_js/libs/schwifty.js";

function init() {

  watchForms();
  watchBeforeAfterModules();

  $$(".carousel").forEach(carousel => {
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
  $$("[data-animate]").forEach(elem => {
    elem.setAttribute("data-offscreen", true);
    setTimeout(() => observer.observe(elem), 100);
  });
  new Rellax('.rellax');
}

init();

new Schwifty({
  onload: init,
  preserveScroll: false
})