import Schwifty from './schwifty';
import { $, $$, attr, round } from './utils';

function init() {

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

init();

new Schwifty({
  preserveScroll: false,
  onload: init
})