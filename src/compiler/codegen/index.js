import directives from "../../../../vue/src/compiler/directives"

// 根据ast生成代码
export function generate (ast, options) {
  const code = ast ? getElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`
  }
}

