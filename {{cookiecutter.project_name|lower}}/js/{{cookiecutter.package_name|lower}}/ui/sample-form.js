goog.provide('{{cookiecutter.package_name|lower}}.ui.SampleForm');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.ui.Component');


/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 */
{{cookiecutter.package_name|lower}}.ui.SampleForm = function(opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {Element}
   */
  this.$messageText_ = null;

  /**
   * @type {Element}
   */
  this.$submitButton_ = null;
};
goog.inherits({{cookiecutter.package_name|lower}}.ui.SampleForm, goog.ui.Component);


/**
 * @enum {string}
 */
{{cookiecutter.package_name|lower}}.ui.SampleForm.CSS_CLASS = {
  MESSAGE_INPUT: goog.getCssName('message-input'),
  SUBMIT_BUTTON: goog.getCssName('submit-button'),
};


/** @override */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  this.$messageText_ = this.findMessageText_(element);
  this.$submitButton_ = this.findSubmitButton_(element);
};

/**
 * @param {Element} element
 * @return {Element}
 * @private
 */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.findMessageText_ = function(element) {
  return this.getDomHelper().getElementByClass(
      {{cookiecutter.package_name|lower}}.ui.SampleForm.CSS_CLASS.MESSAGE_INPUT,
      element
  );
};


/**
 * @param {Element} element
 * @return {Element}
 * @private
 */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.findSubmitButton_ = function(element) {
  return this.getDomHelper().getElementByClass(
      {{cookiecutter.package_name|lower}}.ui.SampleForm.CSS_CLASS.SUBMIT_BUTTON,
      element
  );
};

/** @override */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  goog.events.listen(
      this.$submitButton_,
      goog.events.EventType.CLICK,
      this.onSubmit_,
      false,
      this
  );
};


/**
 * @param {Event} event
 */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.onSubmit_ = function(event) {
  var messageText = this.$messageText_.value;

  if (!messageText) {
    return;
  }

  this.dispatchEvent({
      message: messageText,
      type: goog.events.EventType.SUBMIT,
  });
};


/** @override */
{{cookiecutter.package_name|lower}}.ui.SampleForm.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  this.$messageText_ = null;
  this.$submitButton_ = null;
};

