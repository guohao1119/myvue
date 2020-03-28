import { initState } from './state'
import { callHook } from './lifecycle'
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this

    // 生命周期钩子函数 1 beforeCreate
    // 在Vue实例初始化之后，数据劫持之前调用
    callHook(vm, 'beforeCreate')
    initState(vm)

    // 生命周期钩子函数 2 created
    // 这里已经完成了数据劫持，但是还没有挂载$el
    callHook(vm, 'created')

    // 当配置了el时，执行挂载方法$mount
    if (this.$options.el) {
      this.$mount(this.$options.el)
    }
  }
}