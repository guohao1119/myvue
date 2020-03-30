import { baseOptions } from "./options"
import { createCompiler } from 'compiler/index'

// 调用createCompiler，传入baseOtions，生成compileToFunctions
// 调用compileToFunctions，传入template，生成render方法
const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }