import { round, debounce } from './_utils';


export function watchParallax(parallaxItems) {
  let intersectingParallaxEntries = [];
  let observer = new IntersectionObserver(entries =>
    intersectingParallaxEntries = entries.filter(entry => entry.isIntersecting),
    {
      threshold: .1,
      rootMargin: "50%"
    }
  )

  parallaxItems.forEach(item => observer.observe(item));

  addEventListener('scroll', () =>
    debounce(() =>
      intersectingParallaxEntries.forEach(entry =>
        entry.target.style.setProperty('--offset', round(scrollY - entry.target.scrollTop))
      )
    )
  )
}