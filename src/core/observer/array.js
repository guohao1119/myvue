
// 拿到Array的原型
const arrayProto = Array.prototype
// 根据Array的原型创建对象
export const arrayMethods = Object.create(arrayProto)