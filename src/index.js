import { removeKeys } from "./utils";

const LocalStore = window.localStorage;
const SessiionStore = window.sessionStorage;
const localMap = new Map(); // 存储不同模块本地存储信息列表
const sessionMap = new Map(); // 存储不同模块本地存储信息列表

// 存储操作
class Storage {
  constructor(namespaced, store) {
    this.namespaced = namespaced;
    this.store = store;
    this.state = {}; // 存储JSON格式数据
    this.init();
  }

  // 初始化当前命名空间的存储信息
  init() {
    try {
      const data = this.store.getItem(this.namespaced);
      if (data) {
        this.state = JSON.parse(data);
      }
      this.saveState();
    } catch (err) {
      this.state = {};
      this.saveState();
    }
  }

  // 保存当前命名空间存储信息
  saveState() {
    this.store.setItem(this.namespaced, JSON.stringify(this.state));
  }

  // 存储字段名对应的内容信息
  setItem(key, data) {
    this.state[key] = data;
    this.saveState();
    return this.state;
  }

  // 获取字段名对应的内容信息
  getItem(key) {
    return this.state[key];
  }

  // 删除字段名对应的内容信息
  removeItem(key) {
    this.state = removeKeys(this.state, [key]);
    this.saveState();
    return this.state;
  }

  // 清空当前命名空间的全部存储信息
  clear() {
    this.state = {};
    this.store.removeItem(this.namespaced);
  }
}

// 创建命名空间
function getTypeStore(map, namespaced, store) {
  if (map.has(namespaced)) {
    return map.get(namespaced);
  }
  map.set(namespaced, new Storage(namespaced, store));
  return map.get(namespaced);
}

export default class ZStore {
  constructor(namespaced = "zlocal") {
    ZStore.localStorage(localMap, namespaced, LocalStore);
  }

  static localStorage(namespaced = "zlocal") {
    return getTypeStore(localMap, namespaced, LocalStore);
  }

  static sessionStorage(namespaced = "zsession") {
    return getTypeStore(sessionMap, namespaced, SessiionStore);
  }
}
