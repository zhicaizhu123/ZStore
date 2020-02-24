/**
 * 根据保留/删除类型过滤字段
 *
 * @param {*} type
 * @returns
 */
const filterKeys = type => (obj, keys = []) =>
  Object.keys(obj).reduce((acc, key) => {
    if (type === "keep" ? keys.includes(key) : !keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

/**
 * 删除给定字段
 *
 * @export
 * @param {*} obj
 * @param {*} [keys=[]]
 * @returns
 */
export const removeKeys = filterKeys("remove");
