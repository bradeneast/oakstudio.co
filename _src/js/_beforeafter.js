import { $, $$, debounce, round, setProp } from "./_utils.js";

export function watchBeforeAfterModules() {

  let grabbing = false;
  let grabbedAttr = 'data-grabbed';

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


  /** Finds the grabbed module (if any) and set grabbing to true
   * @param{MouseEvent} event */
  function setGrabbed(event) {
    clearGrabbed();
    // Check for before/after module
    let module = event.target.closest('.beforeafter');
    if (!module) return;
    // Set grabbing to true and assign grabbed attribute to module
    module.setAttribute(grabbedAttr, "");
    grabbing = true;
  }


  /** Clears attribute from every grabbable module and sets grabbing to false */
  function clearGrabbed() {
    $$('.beforeafter').forEach(module => {
      module.removeAttribute(grabbedAttr);
      grabbing = false;
    });
  }


  /** Updates the `val` custom property on the current module with a position on the X-axis between `0` and `100`
   * @param{Number} x */
  function moveCurrentSlider(x) {
    debounce(() => {
      let module = $('[data-grabbed]');
      if (!module) return;
      // Calculate x position relative to module
      let rect = module.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      let clamped = position.clamp(0, 100);
      setProp(module, 'val', round(clamped, 2));
    })
  }
}