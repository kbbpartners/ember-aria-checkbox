import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import layout from '../templates/components/aria-checkbox';

const KEYCODES = {
  'RETURN': 13,
  'SPACE': 32
};

export default Component.extend({
  layout,
  classNameBindings: ['focus:focus'],
  attributeBindings: ['role', 'ariaChecked:aria-checked', 'tabindex'],
  role: 'checkbox',
  'on-toggle'() {},
  ariaChecked: computed('checked', function() {
    return get(this, 'checked') ? 'true' : 'false';
  }),
  focus: false,
  checked: false,
  tabindex: 0,
  keyDown(e) {
    let flag = false;
    switch(e.keyCode) {
    case KEYCODES.SPACE:
      this.toggleProperty('checked');
      flag = true;
      break;
    default:
      break;
    }

    if(flag) {
      e.stopPropagation();
      e.preventDefault();
    }

  },

  click() {
    this.toggleProperty('checked');
    this.get('on-toggle')(this.get('checked'));
  },

  focusIn() {
    set(this, 'focus', true);
  },

  focusOut() {
    set(this, 'focus', false);
  }
});
