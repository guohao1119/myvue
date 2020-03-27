
// 拿到Array的原型
const arrayProto = Array.prototype
// 根据Array的原型创建对象
export const arrayMethods = Object.create(arrayProto)

// 将数组原型方法中能够改变数组自身的方法进行劫持，在调用这些方法时触发监听器更新
;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
  // 拿到原型中的原始方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 调用原始方法，得到结果
    const result = original.call(this, args)

    // 当前对象的观察者
    const ob = this.__ob__

    // 如果有新增数据，则要对新增数据进行劫持
    // 有3个方法可能新增数据
    let inserted
    switch ( method ) {
      case 'push':
      case 'unshift': 
        inserted = args
      // Array.prototype.splice(start, deleteCount, item1, item2 ...)
      // 此方法的作用是在数组中从start位置开始删除deleteCount个元素，同时新增item1开始的元素
      // 所以如果有新增，新增的元素是从该方法的第三个参数开始的
      // 所以使用slice(2)切出参数列表中的第三个开始的数据
      // 厉害了！
      case 'splice': 
        inserted = args.slice(2)
        break;
    }

    // 如果有新增数据，劫持
    if (inserted) ob.observeArray(inserted)

    // 通知依赖更新
    ob.dep.notify()
    // 返回执行结果
    return result
  })
})