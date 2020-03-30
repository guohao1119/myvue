import { parseHTML } from './html-parser'
// 将html字符串转换成AST（抽象语法树）
export function parse (template, options) {
  let root

  parseHTML(template)

  return root
}