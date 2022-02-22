import { $$ } from "./_includes/js/utils.js";
import observer from "./_includes/js/observer.js";
import Rellax from "./_includes/js/rellax.js";
import Schwifty from "./_includes/js/schwifty.js";

/** Run initial functions for each page */
function init() {

  $$("[data-animate]").forEach(elem => {
    elem.setAttribute("data-offscreen", true);
    setTimeout(() => observer.observe(elem), 100);
  });

  new Rellax('.rellax');
}

//***************//

init();

new Schwifty({
  onload: init,
  preserveScroll: false
})

setTimeout(() => document.documentElement.removeAttribute("data-schwifty"), 500);