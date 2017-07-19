/**
 * 统一处理 失败的状态码
 */

const assertError = (message) =>{
  return {
    message,
    code: -200
  }
}

module.exports = assertError