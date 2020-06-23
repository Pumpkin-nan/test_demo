// debounce 防抖  在一定时间内如果一直操作某事件，则不执行,待事件停止后再过一定时间，执行事件
function debounce (fn, wait = 50) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(args);
      fn.apply(this, args)
    }, wait);
  }
}

let betterFn = debounce(() => console.log('防抖执行了'), 1000)
document.addEventListener('scroll', betterFn)



function debounce (fn, delay) {
  let timer = null
  if (timer) {clearTimeout(timer)}
  timer = setTimeout(fn, delay);
}
// throttle 节流  如果高频率去操作某事件，
function throttle (fn, delay) {
  let previous = 0
  return function(...args) {
    let now = +new Date()
    if (now - previous > delay) {
      previous = now
      fn.apply(this, args)
    }
  }
}


function throttle (fn, delay) {
  let previous = 0
  return function(...args) {
    let now = +new Date()
    if (now - previous > delay) {
      previous = now
      fn.apply(this, ...args)
    }
  }
}


function debounce (fn, delay) {
  let timer = null
  return function(...args) {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}


function throttle (fn, delay) {
  let previous = 0
  return function(...args) {
    let now = +new Date()
    if (now - previous > delay) {
      previous = now
      fn.apply(this, args)
    }
  }
}