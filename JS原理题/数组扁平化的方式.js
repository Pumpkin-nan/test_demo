// toString  局限性数组中的元素必须都是数字
let arr = [[1, 2, 8, [6, 7]], 3, [3, 6, 9], 4]

function flat (arr) {
  return arr.toString().split(',').map( i => +i)
}

console.log(flat(arr))


// ES6中 ...扩展运算符
function flatArr (arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatArr(arr))

// reduce
function flatten (arr) {
  return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flatten(item) : item), [])
}

// ES6的flat（）

let newArray = arr.flat(Infinity)