//@ts-nocheck
export async function html(page: any) {

  /**Helper to select an element on the page */
  let $ = (selector: string, context = page.document) => context.querySelector(selector);
  /**Helper to select many elements on the page */
  let $$ = (selector: string, context = page.document) => context.querySelectorAll(selector);


  // Add a class for unique styling to stop words in headings
  const stopWords = ["the", "if", "of", "a", "in"];
  $$("h1 .word, .title .word").forEach(elem => {
    if (stopWords.includes(elem.innerText.toLowerCase()))
      elem.classList.add("script-font");
  })

  /**Tries to extract a human-readable filename from urls */
  function altFromSrc(src: string) {
    let decoded = decodeURIComponent(src) || '';
    let name = decoded.split('/').pop();
    let result = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');
    return result || '';
  }

  if (page.data.type == "case-study")
    $$("h2, h3, h4, h5, h6, ul, ol, p, blockquote").forEach(elem => {
      elem.setAttribute("data-animate", "from-bottom");
    })


  $$("img, video").forEach(elem => {

    if (!elem.alt?.length)
      elem.alt = elem.alt || altFromSrc(elem.src);

    if (!elem.hasAttribute('aria-hidden'))
      elem.parentElement.classList.add('has-media');

  })
}