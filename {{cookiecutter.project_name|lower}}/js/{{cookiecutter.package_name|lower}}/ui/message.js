goog.provide('{{cookiecutter.package_name|lower}}.ui.Message');

goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('{{cookiecutter.package_name|lower}}.parts');


/**
 * @constructor
 * @param {string} message
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper
 * @extends {goog.ui.Component}
 */
{{cookiecutter.package_name|lower}}.ui.Message = function(message, opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @type {string}
   */
  this.message_ = message;
};
goog.inherits({{cookiecutter.package_name|lower}}.ui.Message, goog.ui.Component);


goog.scope(function() {
  var Message = {{cookiecutter.package_name|lower}}.ui.Message;

  /**
   * @type {string}
   */
  Message.CSS_CLASS = goog.getCssName('message');

  /** @override */
  Message.prototype.createDom = function() {
    goog.base(this, 'createDom');

    this.setElementInternal(goog.soy.renderAsElement(
        {{cookiecutter.package_name|lower}}.parts.message,
        { msg: this.message_ }
    ));
  };

});
