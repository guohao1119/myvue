import Watcher from '../observer/watcher'

// 在Vue原型上挂载一些跟生命周期相关的方法
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this

    // 如果是已经挂载过，则调用组件更新生命周期钩子
    if (vm._isMounted) {
      // 生命周期钩子函数 5 beforeUpdate
      // 在比对是否需要更新前调用
      callHook(vm, 'beforeUpdate')
    }

    // ... 这里进行一系列的虚拟结点的比对、创建、更新等等，后面再研究


  }

  Vue.prototype.$destroy = function () {
    const vm = this
    
    // 生命周期钩子函数 5 beforeUpdate
    // 在组件销毁前调用
    callHook(vm, 'beforeDestroy')

    // ... 一系列销毁操作

    callHook(vm, 'destroyed')
  }
}

export function mountComponent (vm, el) {
  vm.$el = el

  // 生命周期钩子函数 3 beforeMount
  // 在挂载el之前调用
  callHook(vm, 'beforeMount')

  let updateComponent = () => {
    vm._update(vm._render())
  }

  // 挂载组件的时候就会创建监听器对象，并将Dep.target置为该对象，从而触发依赖收集
  new Watcher(vm, updateComponent)

  // 生命周期钩子函数 4 mounted
  // 在挂载el之后调用
  if (vm.$vnode == null) {
    vm._update = true
    callHook(vm, 'mounted')
  }

  return vm
}

// 生命周期钩子函数的调用方法
export function callHook (vm, hook) {
  const hanlders = vm.$options[hook]

  if (hanlders) {
    for (let i = 0, j = hanlders.length; i < j; i++) {
      try {
        hanlders[i].call(vm)
      } catch (e) {
        //...
      }      
    }
  }
}