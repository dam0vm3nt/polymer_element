@JS('Polymer')
library polymer_element;

import 'dart:async';
import 'package:html5/html.dart';
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
  final List<Type> uses;
  const PolymerRegister(this.tagName,{this.template,this.native:false,this.uses});
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

class BowerImport {
  final String ref;
  final String import;
  final String name;
  const BowerImport({this.ref,this.import,this.name});
}


const _Undefined = const {};

class EventOptions {

  final bool bubbles;
  final bool cancelable;
  final HTMLElement node;

  const EventOptions({this.bubbles:true,this.cancelable:false,this.node});
}


Event createCustomEvent(String type,[detail,EventOptions opt = const EventOptions()]) {
  Event ev = new CustomEvent(type,new CustomEventInit()
    ..bubbles = opt.bubbles
    ..cancelable = opt.cancelable
    ..detail = detail);
  return ev;
}

getDetail(Event ev) => (new JsObject.fromBrowserObject(ev))['detail'];

@JS('DomRepeat')
@BowerImport(ref:'polymer#2.0-preview',import:'polymer/lib/elements/dom-repeat.html',name:'polymer')
@PolymerRegister('dom-repeat',native:true)
abstract class DomRepeat implements PolymerElement {
  external itemForElement(el);
  external indexForElement(el);
}

@JS('Templatizer')
@BowerImport(ref:'polymer#2.0-preview',import:'polymer/lib/legacy/templatizer-behavior.html',name:'polymer')
abstract class Templatizer {
  external static flush();
  external PolymerElement templatize(HTMLTemplateElement template,options);
}

@JS('Element')
@BowerImport(ref:'polymer#2.0-preview',import:"polymer/polymer.html",name:'polymer')
abstract class PolymerElement implements HTMLElement {

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
