// 学习如何解析模板

import { parse } from './parser/index'
import { generate } from './codegen/index'
import { optimize } from "../../../vue/src/compiler/optimizer";

export const createCompiler = createCompilerCreator(function (template, options) {
  // 将模板转成ast（用一个对象描述html字符串）
  const ast = parse(template.trim(), options)

  optimize(ast, options) // 优化ast

  const code = generate(ast, options) // 根据ast生成代码

  return {
    ast,
    render: code.render
  }
})