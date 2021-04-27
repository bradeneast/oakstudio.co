let lastFrame = 0;

let round = x => Math.round(x);
let $ = (selector, context = document) => context.querySelector(selector);
let $$ = (selector, context = document) => context.querySelectorAll(selector);
let debounce = (event, callback) => requestAnimationFrame(thisFrame => {
  if (thisFrame - lastFrame > 10) {
    lastFrame = thisFrame;
    callback(event);
  }
})

addEventListener('mousemove', event =>
  debounce(event, () => {
    let x = event.clientX / innerWidth;
    let y = event.clientY / innerHeight;
    let sat = round(Math.max(x, y) * 50 - 10);
    document.documentElement.style.setProperty('--primary', `hsl(${sat}, 100%, 50%)`);
  })
)