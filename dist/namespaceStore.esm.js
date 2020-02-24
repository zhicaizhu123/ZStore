function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * 根据保留/删除类型过滤字段
 *
 * @param {*} type
 * @returns
 */
var filterKeys = function filterKeys(type) {
  return function (obj) {
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return Object.keys(obj).reduce(function (acc, key) {
      if (type === "keep" ? keys.includes(key) : !keys.includes(key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  };
};
/**
 * 删除给定字段
 *
 * @export
 * @param {*} obj
 * @param {*} [keys=[]]
 * @returns
 */


var removeKeys = filterKeys("remove");

var LocalStore = window.localStorage;
var SessiionStore = window.sessionStorage;
var localMap = new Map(); // 存储不同模块本地存储信息列表

var sessionMap = new Map(); // 存储不同模块本地存储信息列表
// 存储操作

var Storage =
/*#__PURE__*/
function () {
  function Storage(namespaced, store) {
    _classCallCheck(this, Storage);

    this.namespaced = namespaced;
    this.store = store;
    this.state = {}; // 存储JSON格式数据

    this.init();
  } // 初始化当前命名空间的存储信息


  _createClass(Storage, [{
    key: "init",
    value: function init() {
      try {
        var data = this.store.getItem(this.namespaced);

        if (data) {
          this.state = JSON.parse(data);
        }

        this.saveState();
      } catch (err) {
        this.state = {};
        this.saveState();
      }
    } // 保存当前命名空间存储信息

  }, {
    key: "saveState",
    value: function saveState() {
      this.store.setItem(this.namespaced, JSON.stringify(this.state));
    } // 存储字段名对应的内容信息

  }, {
    key: "setItem",
    value: function setItem(key, data) {
      this.state[key] = data;
      this.saveState();
      return this.state;
    } // 获取字段名对应的内容信息

  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.state[key];
    } // 删除字段名对应的内容信息

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this.state = removeKeys(this.state, [key]);
      this.saveState();
      return this.state;
    } // 清空当前命名空间的全部存储信息

  }, {
    key: "clear",
    value: function clear() {
      this.state = {};
      this.store.removeItem(this.namespaced);
    }
  }]);

  return Storage;
}(); // 创建命名空间


function getTypeStore(map, namespaced, store) {
  if (map.has(namespaced)) {
    return map.get(namespaced);
  }

  map.set(namespaced, new Storage(namespaced, store));
  return map.get(namespaced);
}

var ZStore =
/*#__PURE__*/
function () {
  function ZStore() {
    var namespaced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "zlocal";

    _classCallCheck(this, ZStore);

    ZStore.localStorage(localMap, namespaced, LocalStore);
  }

  _createClass(ZStore, null, [{
    key: "localStorage",
    value: function localStorage() {
      var namespaced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "zlocal";
      return getTypeStore(localMap, namespaced, LocalStore);
    }
  }, {
    key: "sessionStorage",
    value: function sessionStorage() {
      var namespaced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "zsession";
      return getTypeStore(sessionMap, namespaced, SessiionStore);
    }
  }]);

  return ZStore;
}();

export default ZStore;
