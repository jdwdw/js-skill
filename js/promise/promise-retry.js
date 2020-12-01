/**
 * 重试n次的promise
 */

function getData(){
    let p = new Promise(function(resolve, reject){
        setTimeout(function(){
            var num = Math.ceil(Math.random()*20); //生成1-10的随机数
            console.log('随机数生成的值：',num)
            if(num<=10){
                console.log('符合条件，值为'+num)
                resolve(num);
            }
            else{
                reject('数字大于10了执行失败');
            }
        }, 2000);
       })
       return p
}

function retry(fn,num,delay){
    return new Promise((resolve,reject)=>{
        function attempt(){
            fn().then(resolve).catch(error=>{
                console.log(`还有 ${num} 次尝试`)
                if(num ===0){
                    reject(error)
                }else{
                    num--
                    setTimeout(()=>{
                        attempt()
                    },delay)
                }
            })
        }
        attempt()
    })
}

// 调用example
retry(getData,3,500).then((num)=>{
    console.log('eee',num);
})
