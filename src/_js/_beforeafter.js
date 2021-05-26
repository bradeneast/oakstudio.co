import { $, $$, debounce, round, setProp } from "./_utils";

export function watchBeforeAfterModules() {

  let grabbing = false;
  let grabbedAttr = 'data-grabbed';
  let getModule = elem => elem.closest('.beforeafter');
  let clearGrabbed = () => {
    $$('.beforeafter').forEach(module => {
      module.removeAttribute(grabbedAttr);
      grabbing = false;
    });
  }

  let setGrabbed = event => {
    clearGrabbed();
    let module = getModule(event.target)
    if (module) {
      module.setAttribute(grabbedAttr, "");
      grabbing = true;
    }
  }

  let moveCurrentSlider = (x) => debounce(() => {

    let module = $('[data-grabbed]');
    if (!module) return;

    let rect = module.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    let clamped = position.clamp(0, 100);
    setProp(module, 'val', round(clamped, 2));
  });

  addEventListener('touchstart', setGrabbed);
  addEventListener("mousedown", setGrabbed);
  addEventListener('touchend', clearGrabbed);
  addEventListener("mouseup", clearGrabbed);

  addEventListener("mousemove", event => {
    if (!grabbing) return;
    moveCurrentSlider(event.clientX)
  });
  addEventListener('touchmove', event => {
    if (!grabbing) return;
    moveCurrentSlider(event.changedTouches[0].clientX);
  });
}