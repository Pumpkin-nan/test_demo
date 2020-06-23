function JSONP({url, params = {}, callbackKey, callback}) {
  params[callbackKey] = 'jsonpCallback'
  window.jsonpCallback = callback
  const paramKeys = object.keys(params)
  const paramString = paramsKeys.map(key => `${key}=${params[key]}`).join('&')
  const script = document.createElement('script')
  script.setAttribute('src', `${url}?${paramString}`)
  document.body.appendChild(script)
}

JSONP({
  url: 'http://s.weibo.com/ajax/jsonp/suggestion',
  params: {
    key: 'test'
  },
  callbackKey: '_cb',
  callback(result) {
    console.log(result.data);
  }
})

function jsonp({url, params, callback}) {
  return new Promise((resolve, reject) => {
    params = {...params, callback}
    let arrs = params.map(key => `${key}=${params[key]}`).join('&')
    let script = document.createElement('script')
    script.setAttribute('src', `${url}?${attrs}`)
    document.body.appendChild(script)
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
  })
}

jsonp({
  url: 'http://localhost:3000/say',
  params: {
    wd: 'Iloveyou'
  },
  callback: 'show'
}).then(data => {
  console.log(data)
})

// 作者： 浪里行舟
// 链接： https: //juejin.im/post/5c23993de51d457b8c1f4ee1
//   来源： 掘金
// 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。