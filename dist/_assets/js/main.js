(()=>{var n=0,o=e=>Math.round(e);var m=(e,l)=>requestAnimationFrame(t=>{t-n>10&&(n=t,l(e))});addEventListener("mousemove",e=>m(e,()=>{let l=e.clientX/innerWidth,t=e.clientY/innerHeight,r=o(Math.max(l,t)*50-10);document.documentElement.style.setProperty("--primary",`hsl(${r}, 100%, 55%)`)}));})();