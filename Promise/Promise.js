// IIFE
(function(window){
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function  Promise(excutor) {
    const self = this
    self.status = PENDING
    self.data = undefined
    self.callbacks = [] // {onResolved, onRejected}
    function resolve(value) {
      if (self.status !== PENDING) { return }
      self.status = RESOLVED
      self.data = value
      if (self.callbacks.length > 0) {
        setTimeout(() => {
         self.callbacks.forEach(callbacksObj => {
           callbacksObj.onResolved(value)
         }); 
        });
      }
    }
    function reject(reason) {
      if (self.status !== PENDING) { return }
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
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
      function handle(callback) {
        try {
          const result = callback(slef.data)
          if (result instanceof Promise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      if (self.status === RESOLVED) {
        handle(onResolved)
        
      } else if (self.status === REJECTED) {
        handle(onRejected)
        
      } else { //PENDING 
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
            
          },
          onRejected(reason) {
            handle(onRejected)

          }
        })
      }
    })
  }

  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected)
  }

  Promise.resove = function(value) {
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
    const values = new Array(promises.length)
    const succussCount = 0
    return new Promise ((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            succussCount++
            values[index] = value

            if (succussCount === promises.length) {
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          }
        )
      });
    })
  }

  Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            reject(reason)
          }
        )
      });
    })
  }
  window.Promise = Promise
})(window)