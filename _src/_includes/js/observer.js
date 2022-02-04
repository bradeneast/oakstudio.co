let setOffscreen = entry => {
  if (!entry.isIntersecting)
    entry.target.setAttribute('data-offscreen', true);
  else if (entry.isIntersecting) {
    entry.target.removeAttribute('data-offscreen');
    observer.unobserve(entry.target);
  }
}

let observer = new IntersectionObserver(entries => {
  entries.forEach(setOffscreen);
},
  { rootMargin: "-150px 0px" }
);

export default observer;