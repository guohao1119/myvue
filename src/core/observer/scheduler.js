import { nextTick } from "../../../../vue/src/core/util"

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
  queue.sort((a, b) => a.id - b.id)

  let watcher, index

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    // 执行后清除掉has中的该id
    has[id] = null
    // 真正执行修改数据
    watcher.run()
  }
}