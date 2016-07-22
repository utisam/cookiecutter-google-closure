/* global EventComponent */

class SampleForm extends EventComponent {
  constructor() {
    super();
    /** @type {Element} */
    this.$element;
    /** @type {Element} */
    this.$messageInput_;
  }

  /** @param {Element} $element */
  decorate($element) {
    this.decorateInternal($element);
    this.enterDocument();
  }

  /** @param {Element} $element */
  decorateInternal($element) {
    this.$element = $element;

    function findElement(className) {
      return $element.getElementsByClassName(className)[0];
    }

    this.$messageInput_ = findElement(SampleForm.CSS_CLASSES.MESSAGE_INPUT);
  }

  enterDocument() {
    this.$element.addEventListener('submit', (event) => {
      this.dispatchEvent(event);
      event.preventDefault();
    });
  }

  /* Properties */

  get message() {
    return this.$messageInput_.value;
  }
}

/** @enum {string} */
SampleForm.CSS_CLASSES = {
  MESSAGE_INPUT: 'message-input',
  SUBMIT_BUTTON: 'submit-button',
};