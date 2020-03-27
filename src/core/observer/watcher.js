import { queueWatcher } from './scheduler'
import { pushTarget } from './dep'
export default class Watcher {

  // 每次new一个Watcher实例的时候触发构造器执行
  constructor () {
    // 监听器实例数组中加入一个新的实例对象
    vm._watchers.push(this)

    this.value = this.get()
  }

  // 在new Watcher的时候（每新增一个watcher实例，就会将Dep.target指向该实例）
  // 并将该实例的value值设为属性的值
  get () {
    // 将当前监听器实例对象放入Dep.target中
    pushTarget(this)

    let value
    const vm = this.vm
    // 执行get获取属性值
    value = this.getter.call(vm, vm)

    return value
  }

  addDep (dep) {
    this.newDeps.push(dep)

    dep.addSub(this)
  }

  // 改变某个值，相关的依赖会在这里更新
  update () {
    // 将要更新的watcher放进队列里
    queueWatcher(this)
  }

  run () {
    // 调用get获取新值
    const value = this.get()
    // this.value是旧值，比较二者不同则更新
    if (value !== this.value) {
      const oldValue = this.value
      // 更新值
      this.value = value

      // 如果设置了回调，则执行回调
      // 在回调中传入当前实例、新值、旧值
      this.cb.call(this.vm, value, oldValue)
    }
  }
}