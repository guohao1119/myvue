// 混入一些和组件渲染相关的方法
export function renderMixin (Vue) {
  Vue.prototype._render = function () {
    // 经过前期处理（如果使用template，则会编译成render方法）,从options中拿到render方法
    const { render } = vm.$options

    let vnode
    try {
      // 构建vnode
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      
    }
    return vnode
  }
}