@JS('Polymerize')
@HtmlImport('polymerize_js.html')
library polymerize.init;

import 'package:js/js.dart';
import 'package:polymerize_common/html_import.dart';
// ignore: UNUSED_IMPORT
import 'package:html5/html.dart';

@JS()
@anonymous
class ReduxInfo {
  external String get module;

  external factory ReduxInfo({String module});
}

@JS()
@anonymous
class Config {
  external List<Property> get properties;
  external List<Action> get actions;
  external List<String> get observers;
  external List<Action> get reduxActions;
  external List<String> get behaviors;
  external ReduxInfo get reduxInfo;

  external factory Config({List<Property> properties, List<Action> actions, List<String> observers, List<Action> reduxActions, List<String> behaviors, ReduxInfo reduxInfo});
}

@JS()
@anonymous
class Property {
  external factory Property();
}

@JS()
@anonymous
class Action {
  external factory Action();
}

@JS()
@anonymous
class Summary {
  external factory Summary();
}

@JS()
external register([Type type, String tag, Config config, Summary summary, bool native, String templateUrl]);

config({List<Property> properties, List<Action> actions, List<String> observers, List<Action> reduxActions, List<String> behaviors, ReduxInfo reduxInfo}) =>
    new Config(properties: [], actions: [], observers: [], reduxActions: [], behaviors: [], reduxInfo: new ReduxInfo());

summary() => new Summary();
