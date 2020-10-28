// 一. Promise的实现 （订阅发布模型）https://zhuanlan.zhihu.com/p/58428287
/**
 * 1.极简版本
 */
class Promise {
    callbacks = [];
    constructor(fn){
        fn(this._resolve.bind(this))
    }
    then(onFulfilled){
        this.callbacks.push(onFulfilled)
        return this // return 是为了实现简单的的链式传递，后面要优化为生成新的Promise
    }
    _resolve(value){
        this.callbacks.forEach(fn=>fn(value))
    }
}

let p = new Promise(resolve=>{
    setTimeout(()=>{
        console.log('done');
        resolve('2')
    },2000);
}).then((tip)=>{
    console.log('tip',tip);
})

/**
 * 2.加入延时机制
 * 版本1中如果 new Promise 参数 fn 为同步执行函数，在执行_resolve时，then的要添加的回调还没加入到callbacks中
 * 所以在_resolve中加入延时去解决问题
 */

 class Promise{
     callbacks=[];
     constructor(fn){
         fn(this._resolve.bind(this))
     }
     then(fn){
         this.callbacks.push(fn)
         return this
     }
     _resolve(value){
         // 加入setTimeout把任务加入到宏任务队列尾部
         setTimeout(()=>{
            this.callbacks.forEach(fn=>fn(value))
         })
     }
 }

 let p = new Promise(resolve => {
    console.log('同步执行');
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});

/**
 * 3.增加状态
 * 版本2中如果 p 在延长中调用 p.then就不会调用，因为那是执行 _resolve时，then中的fn 还没有加入到callbacks中
 * 例如:
 * setTimeout(() => {
    p.then(tip => {
        console.log('then3', tip);
    })
    });
 * 解决方案加入 执行状态去判断，然后如果状态改变后，之后的then到直接返回值就好了
 */
class Promise {
    callbacks = [];
    status = 'pending' // 状态
    value = null; // 结果
    constructor(fn){
        fn(this._resolve.bind(this))
    }
    then(onFulfilled){
        if(this.status === 'pending'){
            this.callbacks.push(onFulfilled)
        }else{
            onFulfilled(this.value)
        }
        return this
    }
    _resolve(value){
        this.status = 'fulfilled'
        this.value = value
        this.callbacks.forEach(fn=>fn(value))
    }
}

//////////////////////////////////////////////
// 二.  Promise 的链式调用 https://zhuanlan.zhihu.com/p/102017798 
/**
 *  一中的留下的坑，then中返回的是this，应该要返回新的 Promise
 *  1.
 */
class Promise{
    callbacks = []
    status = 'pending'
    value = null
    constructor(fn){
        fn(this._resolve.bind(this))
    }
    then(onFulfilled){
        return new Promise(resolve=>{
            this._handle({
                onFulfilled:onFulfilled||null,
                resolve:resolve
            })
        })
    }
    _handle(callback){
        if(this.status === 'pending'){
            this.callbacks.push(callback)
            return
        }
        // then中没有传参数的情况
        if(!callback.onFulfilled){
            callback.resolve(this.value)
            return
        }
        const ret = callback.onFulfilled(this.value)
        callback.resolve(ret)
    }
    _resolve(value){
        this.status = 'fulfilled'
        this.value = value
        this.callbacks.forEach(callback=>this._handle(callback))
    }
}
/**
 * 上面1.中值适合 ononFulfilled返回值为 value情况
 * onFulfilled返回值为 Promise的情况 需要在 _resolve中判断并处理
 * (对 resolve 中的值作了一个特殊的判断，判断 resolve 的值是否为 Promise实例，如果是 Promise 实例，
 * 那么就把当前 Promise 实例的状态改变接口重新注册到 resolve 的值对应的 Promise 的 onFulfilled 中，
 * 也就是说当前 Promise 实例的状态要依赖 resolve 的值的 Promise 实例的状态)
 */

 class Promise{
     callbacks = []
     status = 'pending'
     value =null
     constructor(fn){
         fn(this._resolve.bind(this))
     }
     then(onFulfilled){
        return new Promise(resolve=>{
            this._handle({
                onFulfilled:onFulfilled || null,
                resolve:resolve
            })
        })
     }
     _handle(callback){
         if(this.status === 'pending'){
             this.callbacks.push(callback)
             return
         }
         if(!callback.onFulfilled){
             callback.resolve(this.value)
             return
         }
         const ret = callback.onFulfilled(this.value)
         callback.resolve(ret)
     }
     _resolve(value){
         // 判断前一个Promise的 onFulfilled的返回值
         if(value &&(typeof value === 'object' || typeof value === 'function')){
             const then = value.then
             if(typeof then === 'function'){
                 then.call(value,this._resolve.bind(this))
                 return
             }
         }
         this.status = 'fulfilled'
         this.value = value
         this.callbacks.forEach(callback=>this._handle(callback))
     }
 }

 //////////////////////////////////////////////////////////
 // Promise原型方法实现
 /**
  * reject 和 resolve状态分离
  */
 class Promise{
     callbacks = []
     status = 'pending'
     value = null
     constructor(fn){
         fn(ths._resolve.bind(this),this._reject.bind(this))
     }
     then(onFulfilled,onRejected){
         return new Promise((resolve,reject)=>{
             this._handle({
                 onFulfilled:onFulfilled||null,
                 onRejected: onRejected || null,
                 resolve: resolve,
                 reject: reject,
             })
         })
     }
     _handle(callback){
         if(this.status === 'pending'){
             this.callbacks.push(callback)
             return
         }
         let cb = this.status === 'fulfilled'? callback.onFulfilled :callback.onRejected;
         if(!cb){
             cb = this.status === 'fulfilled'? callback.resolve:callback.reject
             cb(this.value)
             return
         }
        //  const ret = cb(this.value)
        //  cb = this.status === 'fulfilled'? callback.resolve:callback.reject
        //  cb(ret)
        let ret;
        try{
            ret = cb(this.value)
            cb = this.status === 'fulfilled'? callback.resolve:callback.reject 
        }catch(error){
            ret = error
            cb = callback.reject
        }finally{
            cb(ret)
        }
     }
     _resolve(value){
         if(value && (typeof value === 'object' || typeof value === 'function')){
             const then = value.then
             if(typeof then === 'function'){
                 then.call(value,this._resolve.bind(this),this._reject.bind(this))
                 return
             }
         }
         this.status = 'fulfilled'
         this.value = value
         this.callbacks.forEach(callback=>this._handle(callback))
     }
     _reject(error){
         this.status = 'rejected'
         this.value = error;
         this.callbacks.forEach(callback=>this._handle(callback))
     }
     catch(onError){
         return this.then(null,onError)
     }
     finally(onDone){
         if(typeof onDone !=='function') return this.then();
         let Promise = this.constructor;
         return this.then(
             value=>Promise.resolve(onDone()).then(()=>value),
             reason=> Promise.resolve(onDone()).then(()=>{ throw reason})
         )
     }
 }