class Action<X> {
  var _obj;

  String get type => _obj.type;
  X get detail => _obj.detail;

  Action(this._obj);
}

const String REDUX_INIT_ACTION_NAME = '@@redux/INIT';