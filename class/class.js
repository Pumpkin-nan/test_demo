class Star {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sing(song) {
    console.log(this.name + song);
  }
}

let ldh = new Star('ldh')
let zxy = new Star('zxy')
ldh.sing('冰雨')


class Father{
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  sum() {
    console.log(this.x + this.y);
  }
}
class Son extends Father {
  constructor(x, y) {
    super(x, y)
  }
}
let son = new Son(1, 3)
son.sum()

// 类的所有方法都定义在原型上 类的构造方法   类的一般方法

class StarPerson extends Star {
  constructor(name, age, salary) {
    super(name, age)
    this.salary = salary
  }
}
let p1 = new StarPerson('wade', 10000)