import { debounce, setProp } from "./_utils";

export function watchBeforeAfter(module) {

  let isGrabbed = false;

  let moveSlider = (x) => {
    debounce(() => {
      if (!isGrabbed) return;
      let rect = module.getBoundingClientRect();
      let position = (x - rect.left) / rect.width;
      let clamped = position.clamp(0, 1);
      setProp(module, 'val', Math.round(clamped * 100));
    });
  }

  module.addEventListener('touchstart', () => isGrabbed = true);
  module.addEventListener("mousedown", () => isGrabbed = true);
  addEventListener('touchend', () => isGrabbed = false);
  addEventListener("mouseup", () => isGrabbed = false);

  addEventListener("mousemove", event => {
    moveSlider(event.clientX);
  });
  addEventListener('touchmove', event => {
    moveSlider(event.changedTouches[0].clientX);
  });
}