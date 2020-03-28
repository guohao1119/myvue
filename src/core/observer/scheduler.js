import { nextTick } from "../util/index"
import { callHook } from "../../../../vue/src/core/instance/lifecycle"

const queue = [] // 存储watcher
const has = {} // 存储watcher id的对象
const waiting = false // 等待标识

export function queueWatcher (watcher) {
  // id watcher的标识
  const id = watcher.id

  // 如果has中没有该id，则说明不在队列里
  // 这就是为什么连续修改同一个值，只在最后一次生效的原因了
  if (has[id] == null) {
    // has[id]设为true，并放入队列
    has[id] = true
    queue.push(watcher)
  }

  // 如果等待标识结束了，则在nextTick一次性刷一遍数据
  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue)
  }
}

function flushSchedulerQueue () {
  // 刷数据前先对watcher进行排序(按照id进行升序排序)
  // 这里进行升序排序是有原因的
  // 可以保证以下几点：
  // 1 组件更新是从父组件到子组件(因为父组件一定比子组件更早创建)
  // 2 组件的用户watcher(user watcher)比渲染watcher(render watcher)更早执行(因为用户watcher比渲染watcher更早创建)
  // 3 如果一个组件在父组件的watcher执行时被销毁了，那么该组件的watcher可以被跳过
  queue.sort((a, b) => a.id - b.id)

  let watcher, index

  // 这里没有使用变量存储queue.length是因为队列的长度随时可能变化
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    // 执行后清除掉has中的该id
    has[id] = null
    // 真正执行修改数据
    watcher.run()
  }

  // 视图更新后调用生命周期钩子updated
  // const updatedQueue = queue.slice()

  callUpdatedHooks(updatedQueue)
}

function callUpdatedHooks(queue) {
  let i = queue.length
  while(i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      // 生命周期钩子函数 6 updated
      // 在视图更新后调用
      callHook(vm, 'updated')
    }
  }
}