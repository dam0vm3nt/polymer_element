class Action<X> {
  var _obj;

  String get type => _obj.type;
  X get detail => _obj.detail;

  Action(this._obj);
}
