(function(window){
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  function Promise(excutor) {
    const self = this
    self.status = PENDING
    self.data = undefined
    self.callbacks = []
    function resolve(value) {
      if(self.status !== PENDING) { return }
      self.status = RESOLVED
      self.data = value
      if(self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          });
        })
      }
    }
    function reject(reason) {
      if(self.status !== PENDING) { return }
      self.status = REJECTED
      self.data = reason
      if(self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(value)
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
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    const self = this
    return new Promise((resolve, reject) => {
      function handle(callback) {
        try {
          const result = callback(self.data)
          if (result instanceof Promise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if(self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      } else if(self.status === RESOLVED) {
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
    return new Promise ((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  Promise.reject = function(reason) {
    return new Promise ((resolve, reject) => {
      reject(reason)
    })
  }
  Promise.all = function(promises) {
    const values = new Array(promises.length)
    const successCount = 0
    return new Promise((resolve, reject) => {
      promises.forEach(function(p, index) {
        Promise.resolve(p).then(
          value => {
            successCount ++
            values[index] = value
            if (successCount === promises.length) {
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
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(function(p, index) {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            rekect(reason)
          }
        )
      })
    })
  }
  window.Promise = Promise
})(window)