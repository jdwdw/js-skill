/**
 * promise限制并发任务
 */

/**
 * 
 * @param {Array} arr 
 * @param {Number} limit 限制任务数
 * @param {Function} fn 
 */
function promiseLimit(arr,limit,fn){
    let index = 0;
    function init(){
        index++;
        if(index<=arr.length){
            fn(index).then(()=>{
                init()
            })
        }
    }
    for(let i=0;i<limit;i++){
        init()
    }
}

/**
 * example
 */

function load(index){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log(index);
            res(); 
        },3000)
    })
}

promiseLimit([1,2,3,4,5,6,7,8,9],3,load)