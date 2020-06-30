/**
 * promise的中断操作 
 * 可以使用npm包 https://www.npmjs.com/package/promise-abortable
 * 或者自己写一个util 参考 https://zhuanlan.zhihu.com/p/43011265
 */

/**
 * 
 * @param {Promise} fetchPromise 
 */
function fetchWithAbort(fetchPromise) {
    let abort = null
    const abortPromise = new Promise((resolve, reject) => {
      abort = () => {
        reject('abort')
      }
    })
    let promiseWithAbort = Promise.race([fetchPromise, abortPromise])
    promiseWithAbort.abort = abort
    return promiseWithAbort
}

