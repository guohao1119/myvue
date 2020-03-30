let initProxy

initProxy = function initProxy (vm) {
  if (hasProxy) {
    const options = vm.$options
    const handlers = options.render && options.render._withStripped
      ? getHandler
      : hasHandler
    vm._renderProxy = new Proxy(vm, handlers)
  } else {
    vm._renderProxy = vm
  }
}

export { initProxy }