// Promise的实现 （订阅发布模型）
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