goog.provide('{{cookiecutter.package_name|lower}}.entrypoint.index.main');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('{{cookiecutter.package_name|lower}}.ui.SampleForm');
goog.require('{{cookiecutter.package_name|lower}}.ui.Message');


{{cookiecutter.package_name|lower}}.entrypoint.index.main = function() {

  var sampleForm = new {{cookiecutter.package_name|lower}}.ui.SampleForm();
  var $sampleForm = goog.dom.getElement('main');
  sampleForm.decorate($sampleForm);

  var $resultSection = goog.dom.getElement('result-section');
  sampleForm.listen(
      goog.events.EventType.SUBMIT,
      function(event) {
        var message = new {{cookiecutter.package_name|lower}}.ui.Message(event.message);
        message.render($resultSection);
      }
  );
};

goog.events.listen(
    window,
    goog.events.EventType.LOAD,
    {{cookiecutter.package_name|lower}}.entrypoint.index.main
);

