// GENERATED CODE - DO NOT MODIFY BY HAND


// **************************************************************************
// Generator: PolymerizeDartGenerator
// **************************************************************************

part of 'package:polymer_element/observe.dart';

@initModule
generatedInitModule() {
  defineBehavior(
      'Polymerize.AutonotifyBehavior',
      AutonotifyBehavior,
      new Config(
          observers: [],
          properties: jsify({
            '_mainNotifier': new PolymerProperty(notify: false, computed: null)
          }),
          reduxActions: [],
          behaviors: [
            resolveJsObject('Polymerize.DartCallbacksBehavior'),
            resolveJsObject('Polymerize.PropertyObserverBehavior')
          ]));
  return;
}

final FORCE_asset_polymer_element_lib_observe_dart = false ||
    FORCE_asset_html5_lib_html_dart ||
    FORCE_asset_polymer_element_lib_polymer_element_dart;

