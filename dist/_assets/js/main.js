(()=>{var M=class{constructor(l,{renderControls:s=!0,renderDots:u=!0,selectedClass:g="selected",swipeSensitivity:f=.2,align:b="center",wrap:P=!0,autoScroll:C=0}={}){let k="next",F="previous",n="data-coarse",L="coarse-controls",Z=`.${L}.${k}`,N=`.${L}.${F}`,A=!1,_=0,i,R=[],p=Array.from(l.children),y=p.length,D=l.querySelector(`.${g}`),a=l.parentElement,w;C&&(w=setInterval(()=>d(i+1),C));let x=e=>`slide ${e+1} of ${y}`,ee=e=>parseFloat(e.replace("px","")),h=(e,t)=>ee(getComputedStyle(e)[t]),O=e=>e.target.closest(`[${n}]`),m=(e,t,r=window)=>r.addEventListener(e,t),te=e=>{i=parseFloat(e),p.map((t,r)=>t.classList.toggle(g,r==e)),R.map((t,r)=>t.classList.toggle(g,r==e))},X=e=>{let t=e.changedTouches?e.changedTouches[0]:e;A=!0,_=t.clientX},z=e=>{if(!A)return;let r=(e.changedTouches?e.changedTouches[0]:e).clientX-_;r<f*100-100&&d(i+1),r>100-f*100&&d(i-1),clearInterval(w)},d=e=>{A=!1;let t=e==y,r=e<0;if((r||t)&&!P)return;r?e=y-1:t&&(e=0);let c=p[e],S=a.querySelector(Z),v=a.querySelector(N),T=h(c,"width"),G=h(c,"marginLeft"),E=h(c,"marginRight"),H=h(a,"width")-h(a,"paddingLeft")-h(a,"paddingRight"),le=h(l,"width"),re=e*(T+G+E),q=G*-1;/center/i.test(b)&&(q=(H-T-E-E)*.5),/right/i.test(b)&&(q=H-T-E),P||(S.disabled=!1,v.disabled=!1,e<=0&&(v.disabled=!0),e==y-1&&(S.disabled=!0)),te(e);let oe=(re-q)/le;if(l.style.transform=`translate3d(${oe*-100}%, 0, 0)`,s){let I=i+1;S.setAttribute(n,I),S.title=`Go to ${x(I==y?0:I)}`;let W=i-1;v.setAttribute(n,W),v.title=`Go to ${x(i?W:y-1)}`}};if(s&&[F,k].map((e,t)=>{let r=document.createElement("button");r.title=e,r.classList.add(L,e),r.setAttribute(n,i+(t||-1)),a.append(r)}),u){let e=document.createElement("div");e.classList.add("coarse-dot-navigation"),p.map((t,r)=>{let c=document.createElement("button");c.title=`Jump to ${x(r)}`,c.setAttribute(n,r),R.push(c),e.append(c)}),a.append(e)}d(D?p.indexOf(D):0),p.map((e,t)=>e.setAttribute(n,t)),m("resize",()=>requestAnimationFrame(()=>d(i))),m("focusin",e=>{clearInterval(w);let t=O(e);p.indexOf(t)>-1&&d(t.getAttribute(n))},a),m("click",e=>{clearInterval(w);let t=O(e);t&&d(t.getAttribute(n))},a),f>0&&(m("mousedown",X,a),m("touchstart",X,a),m("mouseup",z,a),m("touchend",z,a))}},B=M;var j=(o,l=0)=>l?Math.round(o*10*l)/(10*l):Math.round(o);var $=(o,l=document)=>l.querySelectorAll(o),J=(o,l)=>o.getAttribute(l),Y=0,K=o=>requestAnimationFrame(l=>{l-Y>10&&(Y=l,o())}),Q=(o,l,s)=>o.style.setProperty(`--${l}`,s);function U(){$("form").forEach(o=>{function l(s){let u=s.target,g=u.id;!u.hasAttribute("data-has-conditional")||$("[data-condition]",o).forEach(f=>{let b=J(f,"data-condition");f.classList.toggle("hidden",b!=g),f.setAttribute("required",b==g)})}o.addEventListener("input",l)})}function V(o){let l=u=>Q(u,"offset",j(scrollY-u.offsetTop,2)),s=()=>o.forEach(l);addEventListener("scroll",()=>K(s)),s()}function ae(){U(),V($("[data-parallax]")),$(".carousel").forEach(o=>new B(o,{renderControls:!1,autoScroll:5e3}))}ae();})();
