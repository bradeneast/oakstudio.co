(()=>{var s=(t,e=0)=>e?Math.round(t*10*e)/(10*e):Math.round(t);var o=(t,e=document)=>e.querySelectorAll(t),d=(t,e)=>t.getAttribute(e),f=0,u=t=>requestAnimationFrame(e=>{e-f>10&&(f=e,t())}),c=(t,e,r)=>t.style.setProperty(`--${e}`,r);function h(){o("form").forEach(t=>{function e(r){let l=r.target,n=l.id;!l.hasAttribute("data-has-conditional")||o("[data-condition]",t).forEach(a=>{let i=d(a,"data-condition");a.classList.toggle("hidden",i!=n),a.setAttribute("required",i==n)})}t.addEventListener("input",e)})}function p(t){let e=l=>c(l,"offset",s(scrollY-l.offsetTop,2)),r=()=>t.forEach(e);addEventListener("scroll",()=>u(r)),r()}function m(){p(o("[data-parallax]")),h()}m();})();
