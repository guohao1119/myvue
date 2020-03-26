import Vue from "core/index";
// 从生命周期相关方法中取出mountComponent方法
import { mountComponent } from 'core/instance/lifecycle'

// 定义挂载方法$mount
Vue.prototype.$mount = function(el) {
  return mountComponent(this, el)
}