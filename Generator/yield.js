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