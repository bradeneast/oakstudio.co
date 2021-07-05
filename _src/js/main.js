import { watchBeforeAfterModules } from "./_beforeafter.js";
import Coarse from "./_coarse.js";
import Schwifty from "./_schwifty.js";
import { watchForms } from "./_forms.js";
import observer from "./_observer.js";
import { $$, attr } from "./_utils.js";
import Rellax from "./_rellax.js";
// import Splitting from "./_splitting.js";

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
    setTimeout(() => observer.observe(elem), 500);
  });
  new Rellax('.rellax');
  // Splitting();
}

init();

new Schwifty({
  onload: init,
  preserveScroll: false
})