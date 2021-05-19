import { round, debounce, setProp } from './_utils';


export function watchParallax(parallaxItems) {
  let updateItem = item => setProp(item, 'offset', round(scrollY - item.offsetTop));
  let updateAll = () => parallaxItems.forEach(updateItem);
  addEventListener('scroll', () => debounce(updateAll));
  updateAll();
}