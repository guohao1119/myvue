import { remove } from 'shared/util'

/**
 * 依赖收集器
 */
export default class Dep {
  constructor () {
    // 定义一个数组，用来存放收集到的依赖
    this.subs = []
  }

  addSub (sub) {
    // 收集到的watcher对象放在subs中存储
    this.subs.push(sub)
  }

  // 移除subs中的一个watcher对象
  removeSub (sub) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 当设置data中的某个值时，会调用dep.notify
  notify () {
    // slice方法是对数组的一个浅拷贝，可以传入start和end参数作为起始和结束值，不包含结束位置
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l ; i ++) {
      // 这里的subs[i]就是一个个watcher，调用watcher的update方法
      subs[i].update()
    }
  }
}

// 收集依赖的目标对象
Dep.target = null
// 使用一个堆栈存储target对象
const targetStack = []

// 在watcher中会调用此方法，从而触发依赖收集
export function pushTarget(_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget() {
  Dep.target = targetStack.pop()
}