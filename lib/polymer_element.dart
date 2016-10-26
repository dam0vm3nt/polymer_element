@JS('Polymer')
library polymer_element;

import 'dart:async';
import 'dart:html' as html;
import 'dart:html';
import 'dart:js';
import 'package:js/js_util.dart';
import 'package:js/js.dart';


class Config {
  List observers;

  Config({this.observers});
}

class PolymerRegister {
  final String tagName;
  final String template;
  final bool native;
  const PolymerRegister(this.tagName,{this.template,this.native:false});
}

class Define {
  final String tagName;
  final String htmlFile;
  const Define({this.tagName,this.htmlFile});
}

class Observe {
  final String observed;
  const Observe(this.observed);
}

class Notify {
  const Notify();
}

const Notify notify = const Notify();


const _Undefined = const {};

class EventOptions {

  final bool bubbles;
  final bool cancelable;
  final HtmlElement node;

  const EventOptions({this.bubbles:true,this.cancelable:false,this.node});
}


Event createCustomEvent(String type,[detail,EventOptions opt = const EventOptions()]) {
  Event ev = new CustomEvent(type,canBubble : opt.bubbles,cancelable : opt.cancelable);
  new JsObject.fromBrowserObject(window).callMethod('_addEventDetail',[ev,detail]);
  //new JsObject.fromBrowserObject(ev)['detail'] = detail;
  return ev;
}

getDetail(Event ev) => (new JsObject.fromBrowserObject(ev))['detail'];


@JS('Element')
class _PolymerElement extends html.HtmlElement {
  _PolymerElement() : super.created() {
  }

  external get $;

  external $$(String selector);

  external connectedCallback();

  external disconnectedCallback();

  external attributeChangedCallback(name, old, value);

  // Private method can be overridden safely because they become Symbol ...
  //_invalidateProperties() => _jsObject.callMethod('_invalidateProperties', []);

  external set(name, val);

  external notifyPath(name,[val = _Undefined]);

  external push(path,vals);

  external shift(path,vals);

  external splice(path,index,howmany,items);

}

class PolymerElement extends _PolymerElement {

}
