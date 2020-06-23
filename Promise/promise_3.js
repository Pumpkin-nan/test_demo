(function(window) {
  let PENDING = 'pending'
  let RESOLVED = 'resolved'
  let REJECTED = 'rejected'
  function Promise(excutor) {
    const self = this
    self.status = PENDING
    self.data = undefined
    self.callbacks = [] //onResolved onRejected
    function resolve(value) {
      if (self.status !== PENDING) { return }
      self.status = RESOLVED
      self.data = value
      if (self.callbacks.length) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(self.data)
          }); 
        });
      }
    }
    function reject(reason) {
      if (self.status !== PENDING) { return }
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(self.data)
          }); 
        });
      }
    }
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  Promise.prototype.then = function(onResolved, onRejected) {
    const self = this
    return new Promise((resolve, reject) => {
      function handle (callback) {
        const result = callback(self.data)
        try {
          if (result instanceof Promise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)
        });
      } else { // REJECTED
        setTimeout(() => {
          handle(onRejected)
        });
      }
    })
  }

  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected)
  }

  Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  Promise.reject = function(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  Promise.all = function(promises) {
    let values = new Array(promises.length)
    let resolveSuccess = 0
    return new Promise((resolve, reject) => {
      promises.forEach(function(p, index) {
        Promise.resolve(p).then(
          value => {
            values[index] = value
            resolveSuccess += 1
            if (resolveSuccess === promises.length) {
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    }) 
  }

  Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(function(p, index) {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
  window.Promise = Promise
})(window)