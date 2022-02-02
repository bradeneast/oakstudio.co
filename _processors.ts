//@ts-nocheck
export async function html(page: any) {

  /**Helper to select an element on the page */
  let $ = (selector: string, context = page.document) => context.querySelector(selector);
  /**Helper to select many elements on the page */
  let $$ = (selector: string, context = page.document) => context.querySelectorAll(selector);

  /**Tries to extract a human-readable filename from urls */
  function altFromSrc(src: string) {
    let decoded = decodeURIComponent(src) || '';
    let name = decoded.split('/').pop();
    let result = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');
    return result || '';
  }


  $$("img, video").forEach(elem => {

    if (!elem.alt?.length)
      elem.alt = elem.alt || altFromSrc(elem.src);

    if (!elem.hasAttribute('aria-hidden'))
      elem.parentElement.classList.add('has-media');

  })
}