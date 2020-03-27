// shared文件夹存放一些公共的常量和方法
// util.js中存放方法
// constant.js中存放常量


// 判断是否为对象
export function isObject (obj) {
  // 由于null的typeof也是object，所以这里要把null排除出去
  return obj !== null && typeof obj === 'object'
}

// 判断对象是否含有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}