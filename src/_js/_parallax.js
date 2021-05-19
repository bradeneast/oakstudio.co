import { debounce, round, setProp } from './_utils';

export function initParallax(parallaxItems) {

  let updateParallaxItem = item =>
    setProp(item, 'offset', round(scrollY - item.offsetTop, 2));
  let updateAll = () => parallaxItems.forEach(updateParallaxItem);

  addEventListener('scroll', () => debounce(updateAll));
  updateAll();
}