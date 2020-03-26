// 定义Vue构造函数

import { initMixin } from "./init"

/**
 * 
 * @param {Object} options 构造函数参数
 */
function Vue (options) {
  // 调用_init方法，将参数传进去
  this._init(options)
}

initMixin(Vue)