library polymer_element;

import 'dart:async';
import 'dart:html' as html;
import 'dart:html';
import 'dart:js';

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

class PolymerElement extends html.HtmlElement {
  PolymerElement() : super.created() {
    _jsObject = new JsObject.fromBrowserObject(this);
  }

  JsObject _jsObject;
  JsObject _callSuper(String name, [List args = const []]) =>
      _jsObject.callMethod('__callSuper', [name, args]);

  var $;

  $$(String selector) {}

  connectedCallback() {
    _callSuper('connectedCallback');
  }

  disconnectedCallback() {
    _callSuper('disconnectedCallback');
  }

  attributeChangedCallback(name, old, value) {
    _callSuper('attributeChangedCallback',[name,old,value]);
  }

  // Private method can be overridden safely because they become Symbol ...
  //_invalidateProperties() => _jsObject.callMethod('_invalidateProperties', []);

  set(name, val) => _callSuper('set', [name, val]);

  notifyPath(name,[val = _Undefined]) => val==_Undefined ? _callSuper('notifyPath', [name]) : _callSuper('notifyPath', [name,val]);

  push(path,vals) => _callSuper('push',[path,vals]);

  shift(path,vals) => _callSuper('shift',[path,vals]);

  splice(path,index,howmany,items) => _callSuper('splice',[path,index,howmany,items]);

  // Legacy
  //fire(String type, [ var details, EventOptions options = const
  // EventOptions()]) => _callSuper('fire',[type,details,options]);

}
