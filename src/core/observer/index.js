import { arrayMethods } from './array'
import VNode from '../vdom/vnode'
import Dep from './dep'

import { hasProto, hasOwn, isObject } from '../util/index'

export function observe (value, asRootData) {
  // 如果不是对象，或者不是虚拟结点，则不监测
  if (!isObject(value) || value instanceof VNode) {
    return
  }

  let ob
  // 先判断当前数据有没有__ob__属性，且是不是Observer的实例
  // 如果是，说明已经监听，不再重复监听
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    // 将data作为参数传给Observer构造函数
    ob = new Observer(value)
  }
  // 这个observe的返回值好像没有用到
  return ob
}

export class Observer {
  // 构造器
  constructor (value) {
    // data是数组的处理
    if (Array.isArray(value)) {
      // 根据是否支持使用__proto__进行不同处理
      const augment = hasProto ? protoAugment : copyAugment

      augment(value, arrayMethods, arrayKeys)
      // 观察数组中的元素
      this.observeArray(value)
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

  // 监测数组中的每一个元素
  observeArray (items) {
    for (let i = 0, l = item.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// 增强对象或数组的能力
// 将src放在对象的__proto__上
function protoAugment(target, src) {
  target.__proto__ =src
}

// 通过Object.defineProperty重写数组的相关方法
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
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

