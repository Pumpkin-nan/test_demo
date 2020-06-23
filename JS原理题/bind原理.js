
// 1.改变原函数的 this 指向，即绑定 this
// 2.返回原函数的拷贝
// 3.注意， 还有一点， 当 new 调用绑定函数的时候， thisArg 参数无效。 
// 也就是 new 操作符修改 this 指向的优先级更高
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let self = this //前面调用的
  let arg = [...arguments].slice(1)
  return function Fn(){
    console.log(this,self)
    if (this instanceof Fn) {
      return new self(...arg, ...arguments)
    } else {
      return self.apply(context, arg.concat(...arguments))
    }
  }
}

function foo(name, age) {
  this.name = name;
  this.age = age;
}
var obj = {};
var bar = foo.myBind(obj);
console.log(bar)
bar('Jack');
// console.log(obj.name); // Jack
// var alice = new bar('Alice');
// console.log(obj.name); // Alice
// console.log(alice.name);

/**
 * bind 函数的实现， 需要了解 this 的绑定。 this 绑定有 4 种绑定规则：
  默认绑定
  隐式绑定
  显式绑定
  new 绑定
  四种绑定规则的优先级从上到下， 依次递增， 默认绑定优先级最低， new 绑定最高。 
*/

Function.prototype.myBind1 = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let self = this
  let arg = [...arguments].slice(1)
  return function Fn() {
    if (this instanceof Fn) {
      return new self(...arg, ..arguments)
    } else {
      return self.apply(context, arg.concat(...arguments))
    }
  }
}