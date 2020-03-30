import { isPlainTextElement } from "../../../../vue/src/compiler/parser/html-parser"

// 解析html
export function parseHTML (html, options) {
  let last, lastTag
  while (html) {
    last = html

    // 如果不是最后一个tag，或者最后一个tag不是特殊元素
    // 特殊元素是指script,style,textarea，这些tag可以包含任何内容
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
    } else {

    }

  }
}

// 用来判断一个元素是否是特殊元素，
// 如果元素是script、style、textarea，则是特殊元素
export const isPlainTextElement = makeMap('script,style,textarea', true)