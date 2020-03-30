// 定义Vue构造函数

import { initMixin } from "./init"
import { renderMixin } from "./render"

/**
 * 
 * @param {Object} options 构造函数参数
 */
function Vue (options) {
  // 调用_init方法，将参数传进去
  // 此方法在init.js中定义
  this._init(options)
}

initMixin(Vue)

renderMixin(Vue)