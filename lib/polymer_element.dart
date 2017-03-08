@JS('Polymer')
library polymer_element;

import 'package:html5/html.dart';
import 'dart:js';
import 'package:js/js.dart';
import 'package:js/js_util.dart';

class Config {
  List observers;

  Config({this.observers});
}

class PolymerRegister {
  final String tagName;
  final String template;
  final bool native;
  final List<Type> uses;
  const PolymerRegister(this.tagName,
      {this.template, this.native: false, this.uses});
}

/**
 * Marks a class as a polymer behavior.
 */
class PolymerBehavior {
  final String name;
  const PolymerBehavior(this.name);
}

class Define {
  final String tagName;
  final String htmlFile;
  const Define({this.tagName, this.htmlFile});
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
  const BowerImport({this.ref, this.import, this.name});
}

const _Undefined = const {};

class EventOptions {
  final bool bubbles;
  final bool cancelable;
  final HTMLElement node;

  const EventOptions({this.bubbles: true, this.cancelable: false, this.node});
}

Event createCustomEvent(String type,
    [detail, EventOptions opt = const EventOptions()]) {
  Event ev = new CustomEvent(
      type,
      new CustomEventInit()
        ..bubbles = opt.bubbles
        ..cancelable = opt.cancelable
        ..detail = detail);
  return ev;
}

getDetail(Event ev) => (new JsObject.fromBrowserObject(ev))['detail'];

@JS('DomRepeat')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/elements/dom-repeat.html',
    name: 'polymer')
@PolymerRegister('dom-repeat', native: true)
abstract class DomRepeat implements PolymerElement {
  external itemForElement(el);
  external indexForElement(el);
}

@JS('Templatizer')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/legacy/templatizer-behavior.html',
    name: 'polymer')
abstract class Templatizer {
  external static flush();
  external PolymerElement templatize(HTMLTemplateElement template, options);
}

@JS('MutableDataBehavior')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/legacy/mutable-data-behavior.html',
    name: 'polymer')
abstract class MutableDataBehavior {}

@JS('OptionalMutableDataBehavior')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/legacy/mutable-data-behavior.html',
    name: 'polymer')
abstract class OptionalMutableDataBehavior {}

@JS('MutableData')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/mixins/mutable-data.html',
    name: 'polymer')
abstract class MutableData {}

@JS('OptionalMutableData')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1',
    import: 'polymer/lib/mixins/mutable-data.html',
    name: 'polymer')
abstract class OptionalMutableData {}


@JS('ElementMixin')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1', import: "polymer/lib/mixins/element-mixin.html", name: 'polymer')
abstract class ElementMixin {
  external get $;

  external $$(String selector);

  external set(name, val);

  external notifyPath(name, [val = _Undefined]);

  external push(path, vals);

  external shift(path, vals);
}

@JS('Element')
@BowerImport(
    ref: 'polymer#2.0.0-rc.1', import: "polymer/polymer.html", name: 'polymer')
abstract class PolymerElement implements HTMLElement, ElementMixin {
  external get $;

  external $$(String selector);

  external connectedCallback();

  external disconnectedCallback();

  external attributeChangedCallback(name, old, value);

  external set(name, val);

  external notifyPath(name, [val = _Undefined]);

  external push(path, vals);

  external shift(path, vals);
}

class Polymer {
  static splice(
          PolymerElement el, String path, int index, int howmany, List items) =>
      callMethod(
          el as dynamic, 'splice', [path, index, howmany]..addAll(items));
}

typedef Reducer(state, ReduxAction action);

class StoreDef {
  final Reducer reducer;
  const StoreDef(this.reducer);
}

@BowerImport(
    ref: 'polymer-redux#polymer-2',
    import: "polymer-redux/polymer-redux.html",
    name: 'polymer-redux')
abstract class ReduxBehavior {}

class Redux {
  static dispatch(ReduxBehavior that, String action, List args) =>
      callMethod(that as dynamic, 'dispatch', <dynamic>[action]..addAll(args));
}

@JS()
@anonymous
class ReduxAction<X> {
  external String get type;
  external X get detail;
  external factory ReduxAction({String type,X detail});
}

class ReduxActionFactory {
  const ReduxActionFactory();
}


const ReduxActionFactory reduxActionFactory = const ReduxActionFactory();

class Property {
  final bool notify;
  final String computed;
  final String statePath;
  final Function statePathSelector;
  final Map extra;
  const Property(
      {this.notify: false, this.computed, this.statePath, this.extra,this.statePathSelector});
}
