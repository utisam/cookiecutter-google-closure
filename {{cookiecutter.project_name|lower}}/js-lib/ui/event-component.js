class EventComponent {

  constructor() {
    this.listeners = new Map();
  }

  /* EventTarget interface */

  addEventListener(type, listener) {
    let stack = this.listeners.get(type);
    if (!stack) {
      stack = [];
      this.listeners.set(type, stack);
    }
    stack.push(listener);
  }
  removeEventListener(type, listener) {
    let stack = this.listeners.get(type);
    if (!stack) { return; }
    const length = stack.length;
    for (let i = 0; i < length; ++i) {
      if (stack[i] === listener) {
        stack.splice(i, 1);
        return this.removeEventListener(type, listener);
      }
    }
  }
  dispatchEvent(event) {
    let type = event.type;
    let stack = this.listeners.get(type);
    if (!stack) { return; }
    const length = stack.length;
    for (let i = 0; i < length; ++i) {
      stack[i].call(this, event);
    }
  }
}
