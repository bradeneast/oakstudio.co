export function copyToClipboard(targetElem, value) {

  let textarea = document.createElement("textarea");

  getSelection().removeAllRanges();
  textarea.innerText = value;
  textarea.style.position = "absolute";
  textarea.style.opacity = .001;
  targetElem.appendChild(textarea);

  textarea.focus();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");

  targetElem.classList.add("copied");
  setTimeout(() => targetElem.classList.remove("copied"), 2000);

  textarea.remove();
}

export let $ = (selector, context = document) => context.querySelector(selector);
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

export let toggleRootClass = (className, force) => {
  document.documentElement.classList.toggle(className, force);
}