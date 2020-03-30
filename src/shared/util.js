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

// 从数组中删除一个元素
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 此方法将传进来的str转成对象的形式
// str 以逗号分隔的字符串 'script,style,area'
//  -> 
// {script: true, style: true, area: true}
// 最终返回的是一个匿名方法 val => map[val]
// 可以通过调用返回的该方法来判断数据是否处于该对象中
export function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }

  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}