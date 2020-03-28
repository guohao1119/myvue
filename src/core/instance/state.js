import { observe } from "../observer/index"
import Watcher from "../observer/watcher"
import Dep from "../observer/dep"

export function initState (vm) {
  // 拿到vue实例传入的配置
  const opts = vm.$options

  // 如果配置了data
  if (opts.data) {
    // 初始化data
    initData(vm)
  } else {
    // 没有配置data就传入一个空对象
    observe(vm._data = {}, true)
  }

  // 初始化computed
  if (opts.computed) initComputed(vm, opts.computed)

  // 初始化watch
  if (opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function initData (vm) {
  let data = vm.$options.data

  // 监测data
  observe(data, true)
}

// 计算属性使用示例
// computed () {
//   fullName () {
//     return this.fisrtName + this.lastName
//   }
// }

// 计算属性会配置lazy为true
const computedWatcherOptions = { lazy: true}

function initComputed (vm, computed) {
  // 创建一个监听器存储对象
  // 同时把这个存储对象挂载在vm上
  const watchers = vm._computedWatchers = Object.create(null)

  // 遍历计算属性中配置的每一个属性
  for (const key in computed) {
    // 拿到属性对应方法
    const userDef = computed[key]
    // 兼容计算属性定义不是一个函数的情况
    const getter = typeof userDef === 'function' ? userDef : userDef.getter

    // 创建一个监听器实例，放入监听器存储对象中
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)
  }

  
  if (!(key in vm)) {
    // 如果这个计算属性不在实例对象上，就劫持这个属性
    defineComputed(vm, key, userDef)
  } 
}

export function defineComputed (target, key, userDef) {
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function sharedPropertyDefinition (key) {
  return function () {
    // 从监听器存储对象上根据key拿到监听器实例
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) { // dirty为true才更新取值，从而实现了数据缓存机制
        watcher.evaluate()
      }
      if (Dep.target) { // 当前依赖的target存在时，收集依赖
        watcher.depend()
      }
      // 否则将watcher保持的原值返回回去
      return watcher.value
    }
  }
}

// watch () {
//   firstName () {
//     console.log(this.firstName)
//   }
// }
function initWatch (vm, watch) {
  // 遍历watch中定义的属性
  for (const key in watch) {
    const handler = watch[key]
    // 这里可以看到watc时可以传入数组
    if (Array.isArray(handler)) {
      for (let i; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (vm, keyOrFn, handler, options) {
  // 如果watch配置的是一个对象，则需要处理一下
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  return vm.$watch(keyOrFn, handler, options)
}

// 状态混入
export function stateMixin (Vue) {
  // Vue原型上挂载$watch方法
  Vue.prototype.$watch = function(expOrFn, cb, options) {
    const vm = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {} // watch配置对象形式才会有options
    // 如果immediate配置为true，则初始就执行一次回调，将newValue是初始值，oldValue是undefined
    if (options.immediate) {
      ca.call(vm, watcher.value)
    }
    // 根据配置创建一个监听器
    const watcher = new Watcher(vm, expOrFn, cb)

    // 返回一个闭包，保存当前监听器对象，可以通过调用返回的方法来停止监听
    return function () {
      watcher.teardown()
    }
  }
}