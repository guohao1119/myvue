import { isNative } from "../../../../vue/src/core/util"

// 用于判断是否可以使用__proto__
export const hasProto = '__proto__' in {}

// 异步执行一个任务
export const nextTick = (function () {
  // 存放回调函数的数组
  const callbacks = []
  // 等待标识
  let pending = false
  let timerFunc

  // 每一个事件队列触发时要执行的方法
  function nextTickHandler() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // 异步机制
  // 如果全局方法中有setImmediate
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
      setImmediate(nextTickHandler)
    }
    // 如果支持消息通道
  } else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) || MessageChannel.toString() === '[object MessageChannelConstructor]')) {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = nextTickHandler
    timerFunc = () => {
      port.postMessage(1)
    }
    // 如果支持Promise
  } else if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
      p.then(nextTickHandler)
    }
  } else {
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }
  // 闭包
  return function (cb) {
    callbacks.push(() => {
      cb.call()
    })

    if (!pending) {
      pending = true
      timerFunc()
    }
  }
})()
