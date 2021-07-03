import { $$, attr } from './_utils.js';

export function watchForms() {
  $$('form').forEach(form => {

    let params = new URLSearchParams(location.search);

    console.log(params.get('message'));

    $$('input, textarea, select', form).forEach(input => {
      let { type, id } = input;
      if (type == 'submit') return;
      if (type == 'radio' || type == 'checkbox')
        input.checked = params.get(id);
      input.value = params.get(id);
    })

    function handleInput(event) {

      let target = event.target;
      let id = target.id;

      if (!target.hasAttribute('data-has-conditional')) return;

      $$('[data-condition]', form).forEach(conditional => {
        let ref = attr(conditional, 'data-condition');
        conditional.classList.toggle('hidden', ref != id);
        conditional.setAttribute('required', ref == id);
      })
    }

    form.addEventListener('input', handleInput)
  })
}