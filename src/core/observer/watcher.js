import { queueWatcher } from './scheduler'
import { pushTarget } from './dep'
import { remove } from 'shared/util'
import { popTarget } from './dep'
export default class Watcher {
  // 定义一个监听器对象的私有属性
  vm
  id
  lazy
  dirty
  sync
  value
  deps
  newDeps

  // 每次new一个Watcher实例的时候触发构造器执行
  constructor (vm, expOrFn, cb, options) {
    // 监听器实例数组中加入一个新的实例对象
    vm._watchers.push(this)

    // watch的第三种配置方式，以对象形式配置
    if (options) {
      // 是否深度监听
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    }

    // 如果是懒取值，则一开始不求值，当dirty为true时再求值，用在计算属性中
    this.value = this.lazy ? undefined : this.get()
  }

  // 在new Watcher的时候（每新增一个watcher实例，就会将Dep.target指向该实例）
  // 并将该实例的value值设为属性的值
  get () {
    // 将当前监听器实例对象放入Dep.target中
    pushTarget(this)

    let value
    const vm = this.vm
    // 执行get获取属性值
    try {
      value = this.getter.call(vm, vm)
    } catch (error) {
      
    } finally {
      if (this.deep) {
        traverse(value)
      }
      popTarget()
    }

    return value
  }

  addDep (dep) {
    this.newDeps.push(dep)

    dep.addSub(this)
  }

  // 改变某个值，相关的依赖会在这里更新
  update () {
    if (this.lazy) { // 如果是lazy的，则会将dirty标识为true
      this.dirty = true
    } else if (this.sync) { // 如果是同步的，则立刻获取新值
      this.run()
    } else {
      // 将要更新的watcher放进队列里
      queueWatcher(this)
    }
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
  evaluate () {
    // 当监听器是懒执行的时候才会调用此方法获取最新的值
    this.value = this.get()
    this.dirty = false 
  }

  depend () {
    let i = this.deps.length
    while(i--) {
      this.deps[i].depend()
    }
  }

  teardown () {
    // 在当前vm实例的监听器存储数组中移除掉当前监听器
    remove(this.vm._watchers, this)
    // 所有依赖当前值的监听器的个数
    let i = this.deps.length
    // 全部清除掉
    while(i--) {
      this.deps[i].removeSub(this)
    }
  }
}

// 当watch配置了deep时，深度监听
function traverse (val) {

}