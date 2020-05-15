// yield* 表达式 
/*
* 如果yield表达式后面跟的是一个遍历器对象， 需要在yield表达式后面加上星号，
* 表明它返回的是一个遍历器对象。 这被称为yield * 表达式。
*/ 

/**
 * 如果yield* 后面跟着一个数组， 由于数组原生支持遍历器， 因此就会遍历数组成员。
 * yield命令后面如果不加星号， 返回的是整个数组， 加了星号就表示返回的是数组的遍历器对象。
*/
function* inner() {
  yield 'hello!';
  yield 'world!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
console.log(gen.next().value) // "open"
console.log(gen.next().value) // "hello!"
console.log(gen.next().value) // "world!"
console.log(gen.next().value) // "close"