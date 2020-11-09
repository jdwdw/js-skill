/**
 * 队列 Queue
 * 受限的线性结构
 * 先进先出 
 */

 function Queue(){
     this.items = []
 }

 // 将元素加入到队列
 Queue.prototype.enqueue = function(element){
     this.items.push(element)
 }

 // 取出删除队列前端元素
 Queue.prototype.dequeue = function (){
     return this.items.shift()
 }

 // 查看队列头的元素
 Queue.prototype.front = function(){
     return this.items[0]
 }

 // 查看队列是否为空
 Queue.prototype.isEmpty = function(){
     return this.items.length === 0
 }

 // 查看队列的元素的个数
 Queue.prototype.size = function(){
     return this.items.length
 }

 // toString 
 Queue.prototype.toString = function(){
     let res
     for (let i of this.items){
         res += i + ''
     }
     return res
 }