@JS('Polymer')
library polymer_element;

import 'package:html5/html.dart';
import 'dart:js';
import 'package:js/js.dart';
import 'package:js/js_util.dart';
export 'super.dart' show callSuper;
export 'package:polymer_element/annotations.dart';
import 'package:polymer_element/annotations.dart';
// ignore: UNUSED_IMPORT
import 'package:polymer_element/polymerize_js.dart';
// ignore: UNUSED_IMPORT
import 'metadata_registry.dart';
import 'package:polymerize_common/init.dart';
export 'metadata_registry.dart';

const String POLYMER_VERSION = "v2.0.0";
const String WEB_COMPONENTS = "v1.0.0";

class Config {
  List observers;

  Config({this.observers});
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
    ref: POLYMER_VERSION,
    import: 'polymer/lib/elements/dom-repeat.html',
    name: 'polymer')
@PolymerRegister('dom-repeat', native: true)
abstract class DomRepeat implements PolymerElement {
  external itemForElement(el);
  external indexForElement(el);
}

@JS('DomIf')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/elements/dom-if.html',
    name: 'polymer')
@PolymerRegister('dom-if', native: true)
abstract class DomIf implements PolymerElement {
}

@JS('Templatizer')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/legacy/templatizer-behavior.html',
    name: 'polymer')
abstract class Templatizer {
  external static flush();
  external PolymerElement templatize(HTMLTemplateElement template, options);
}

@JS('PropertyEffects')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/mixins/property-effects.html',
    name: 'polymer')
abstract class PropertyEffects {
  external notifyPath(String path, [val = _Undefined]);

  external push(String path, item);

  external pop(String path);

  external shift(String path, vals);

  external unshift(String path, item);

  external get(String path, [root]);

  external set(String path, value, [root]);

  external linkPaths(String from, String to);

  external unlinkPaths(String to);

  external notifySplice(String path, splices);
}

@JS('TemplateInstanceBase')
abstract class TemplateInstanceBase implements PropertyEffects {
  external forwardHostProp(prop, value);
  external get parentModel;
}

@JS()
@anonymous
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/utils/templatize.html',
    name: 'polymer')
abstract class TemplatizeModule {
  external TemplateInstanceBase templatize(
      HTMLTemplateElement template, owner, options);
  external modelForElement(host, Element element);
}

@JS('Templatize')
external TemplatizeModule get Templatize;

/**
 * Polymer hybrid behavior in order to mark the element
 * as a mutable data.
 */
@JS('MutableDataBehavior')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/legacy/mutable-data-behavior.html',
    name: 'polymer')
abstract class MutableDataBehavior {}

@JS('OptionalMutableDataBehavior')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/legacy/mutable-data-behavior.html',
    name: 'polymer')
abstract class OptionalMutableDataBehavior {}

@JS('MutableData')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/mixins/mutable-data.html',
    name: 'polymer')
abstract class MutableData {}

@JS('OptionalMutableData')
@BowerImport(
    ref: POLYMER_VERSION,
    import: 'polymer/lib/mixins/mutable-data.html',
    name: 'polymer')
abstract class OptionalMutableData {}

@JS('ElementMixin')
@BowerImport(
    ref: POLYMER_VERSION,
    import: "polymer/lib/mixins/element-mixin.html",
    name: 'polymer')
abstract class ElementMixin implements PropertyEffects {
  external get $;

  external $$(String selector);
}

@JS('Element')
@BowerImport(
    ref: POLYMER_VERSION, import: "polymer/polymer.html", name: 'polymer')
abstract class PolymerElement implements HTMLElement, ElementMixin {
  external get $;

  external $$(String selector);

  external ready();

  external connectedCallback();

  external disconnectedCallback();

  external attributeChangedCallback(name, old, value);
}


/**
 * Unfortunately JS-INTEROP doesn't allows for varargs or
 * more complex method mapping, so we have to provide those
 * ugly static utility methods.
 */
class PropertyEffectsUtils {
  static splice(PropertyEffects el, String path, int index, int howmany,
          List items) =>
      callMethod(
          el as dynamic, 'splice', [path, index, howmany]..addAll(items));
  static unshift(PropertyEffects el, String path, [items]) =>
      callMethod(el as dynamic, 'unshift', [path]..addAll(items));

  static push(PropertyEffects el, String path, [items]) =>
      callMethod(el as dynamic, 'push', [path]..addAll(items));
}
