import { debounce, round, setProp } from './_utils.js';

export function initParallax(parallaxItems) {

  let updateParallaxItem = item => {
    setProp(item, 'offset', round(scrollY - item.offsetTop, 2));
    setProp(item, 'amt', round(scrollY / item.height, 4));
  }
  let updateAll = () => parallaxItems.forEach(updateParallaxItem);

  addEventListener('scroll', () => debounce(updateAll));
  updateAll();
}