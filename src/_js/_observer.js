let setOffscreen = entry => {
  if (!entry.isIntersecting) {
    entry.target.setAttribute('data-offscreen', true);
  }
  if (entry.isIntersecting) {
    entry.target.removeAttribute('data-offscreen');
    observer.unobserve(entry.target);
  }
}

let observer = new IntersectionObserver(
  entries => entries.forEach(setOffscreen),
  { rootMargin: "-100px" }
);

export default observer;