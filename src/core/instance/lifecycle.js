import Watcher from '../observer/watcher'
export function mountComponent (vm, el) {
  vm.$el = el

  // 生命周期钩子，后面再研究
  // callHook(vm, 'beforeMount')

  // 挂载组件的时候就会创建监听器对象，并将Dep.target置为该对象，从而触发依赖收集
  new Watcher()
}