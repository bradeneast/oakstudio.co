import { $$, attr } from './_utils';

export function watchForms() {
  $$('form').forEach(form => {

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