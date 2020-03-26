import { observe } from "../observer/index"

export function initState (vm) {
  // 拿到vue实例传入的配置
  const opts = vm.$options

  // 如果配置了data
  if (opts.data) {
    // 初始化data
    initData(vm)
  }
}

function initData (vm) {
  let data = vm.$options.data

  // 监测data
  observe(data, true)
}