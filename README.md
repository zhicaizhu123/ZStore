# namespace-store

使用命名空间（namespaced）方式实现本地存储（localStorage）和会话存储（sessionStorage），让存储的信息分模块存储，更清晰分明。

## 安装

```sh
npm install -S namespace-store
```

## 开始使用

```js
import namespaceStore from "namespace-store";

//localStorage本地存储
// 设置命名空间为myLocal
const myLocal = namespaceStore.localStorage("myLocal");
// 保存userInfo
myLocal.setItem("userInfo", { name: "ZCoder" });
// 获取userInfo
myLocal.getItem("userInfo");
// 删除userInfo
myLocal.removeItem("userInfo");
// 删除整个命名空间的数据
myLocal.clear();

// sessionStorage会话存储
// 设置命名空间为mySession
const mySession = namespaceStore.localStorage("mySession");
// 保存books
mySession.setItem("books", [{ id: 1, title: "Javascript" }]);
// 获取userInfo
mySession.getItem("books");
// 删除userInfo
mySession.removeItem("books");
// 删除整个命名空间的数据
mySession.clear();
```
