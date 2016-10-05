library polymer_element;

import 'dart:html' as html;
import 'dart:js';

class Config {
  List observers;

  Config({this.observers});
}

class PolymerElement extends html.HtmlElement {
  PolymerElement() : super.created() {
    _jsObject = new JsObject.fromBrowserObject(this);
  }

  JsObject _jsObject;
  JsObject _callSuper(String name, [List args = const []]) =>
      _jsObject.callMethod('__callSuper', [name, args]);

  connectedCallback() {
    _callSuper('connectedCallback');
  }

  // Private method can be overridden safely because they become Symbol ...
  //_invalidateProperties() => _jsObject.callMethod('_invalidateProperties', []);

  set(name, val) => _callSuper('set', [name, val]);
}
