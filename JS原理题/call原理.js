Function.prototype.mycall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
}



// 测试
var foo = {
  name: 'selina'
}
var name = "chris"

function bar(job, age) {
  console.log(this.name)
  console.log(job, age)
}
// bar.mycall(foo, 'programmer', 20)
bar.mycall(null, 'teacher', 25)