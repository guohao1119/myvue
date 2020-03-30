import Vue from "core/index";
// 从生命周期相关方法中取出mountComponent方法
import { mountComponent } from 'core/instance/lifecycle'

// 定义挂载方法$mount
// 这个是公共的挂载方法，vue在不同的模式（编译、运行时）会先存储此方法，然后重写，在重写的方法里会调用此方法
// 也就是会先进行一些处理后，再执行此方法
Vue.prototype.$mount = function(el) {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el)
}