// (a== 1 && a ==2 && a==3)可能为true吗?
let a = {
  i: 1,
  toString () {
    return a.i++
  }
}

if (a == 1 && a == 2 && a == 3) {
  console.log('Hello');
}