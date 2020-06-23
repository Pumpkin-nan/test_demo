let fn = new Fn('pumpkin', 18)
function Fn(name, age) {
  this.name = name
  this.age = age
  console.log(this.name, this.age);
}
// constructor里面的this指向实例对象，方法里面的this指向这个方法的调用者 uname age sing

/************************************/ 
function Star(uname, age) {
  a = '333'
  this.uname = uname
  this.age = age
  this.sing = function() {
    console.log('我会唱歌');
  }
}

let ldh = new Star('ldh', 18)
// 1. 实例成员就是构造函数内部通过this添加的成员
  // 实例成员只能通过实例化的对象来访问   不可以通过构造函数来访问实例成员

// 2. 静态成员 在构造函数本身添加的成员 sex就是静态成员
  // 静态成员只能通过构造函数来访问，  不可以通过实例对象来访问
Star.sex = '男'
console.log(Star.a,Star.sex);