import { arrayMethods } from './array'
import Dep from './dep'

export function observe (value, asRootData) {
  // 将data作为参数传给Observer构造函数
  new Observer(value)
}

export class Observer {
  // 构造器
  constructor (value) {
    // data是数组的处理
    if (Array.isArray(value)) {
      augment(value, arrayMethods, arrayKeys)
    } else { // data是对象的处理
      this.walk(value)
    }
  }

  walk (obj) {
    // 拿到对象的所有key
    const keys = Object.keys(obj)
    // 遍历所有key，调用defineReactive，传入对象，对象属性，对象属性对应的值
    for (let i = 0; i < keys.length; i ++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

/**
 *  接收data，进行响应式处理
 * @param {Object}} obj 
 * @param {string} key 
 * @param {*} val 
 */
export function defineReactive(obj, key, val) {
  // 依赖收集器
  const dep = new Dep()
  // 利用Object.defineProperty劫持数据
  Object.defineProperty(obj, key, {
    // 当读取obj[key]的值时，例如 this.a, 会调用get方法
    get: function reactiveGetter() {
      // 拿到data原始传进来的值
      const value = val

      // 如果Dep的静态属性target的值为true才收集依赖
      if (Dep.target) {
        // 收集依赖
        dep.depend()
      }
      return value
    },
    // 当给obj[key]赋值时，例如 this.a = 1, 会调用set方法
    set: function reactiveSetter(newVal) {
      // 赋新值
      val = newVal
      // 触发依赖的更新
      dep.notify()
    }
  })
}