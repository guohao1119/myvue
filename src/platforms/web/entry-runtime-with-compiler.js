import Vue from "./runtime/index";

// 这里会先缓存Vue中原先定义的$mount
// Vue.prototype.$mount = function (el) {
//   return mountComponent(el)
// }
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el) {
  const options = this.$options
  // 如果没有配置render方法，就将template转成render
  if (!options.render) {
    // 就取template
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        // ...
      } else if (el) {
        // 如果template也没有，则自己生成
        template.getOuterHTML(el)
      }
    }
    if (template) {
      // 调用compileToFunctions将template编译成render方法
      // compileToFunctions 最终是会调用parser/index中的parse中的parseHTML方法将html字符串转为render方法
      const { render } = compileToFunctions(template)
      // 将rend
      options.render = render
    }
  }
  // 经过上面的处理，当前Vue实例的options中拥有了render方法，此时再调用缓存的$mount
  return mount.call(this, el)
}

function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}