import { initState } from './state'
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    initState(vm)

    // 当配置了el时，执行挂载方法$mount
    if (this.$options.el) {
      this.$mount(this.$options.el)
    }
  }
}