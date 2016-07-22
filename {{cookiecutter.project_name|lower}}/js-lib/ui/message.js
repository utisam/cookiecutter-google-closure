class Message {
  /** @param {string} message */
  constructor(message) {
    this.message = message;
  }
  /** @param {Element} $parent */
  render($parent) {
    const $element = document.createElement('div');
    $element.classList.add('result-message');
    $element.classList.add('card');
    $element.innerHTML = this.message;
    $parent.appendChild($element);
  }
}