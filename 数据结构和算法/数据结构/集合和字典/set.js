/**
 * 集合是由一组 无序的 不重复 的元素构成
 * 
 */

 function Set(){
     // 属性
     this.items = {}

     //方法
     //1. has
     Set.prototype.has = value=>{
         return this.items.hasOwnProperty(value)
     }
     // 2.add
     Set.prototype.add = value=>{
         // 集合已经包含该元素
         if(this.has(value)){
             return false
         }
         this.items[value] = value //键和值都为value
         return true
     }
     //3. remove 
     Set.prototype.remove = value=>{
         if(!this.has(value)){
             return false
         }
         delete this.items[value]
         return true
     }
     // 4.clear 
     Set.prototype.clear = ()=>{
         this.items = {}
     }
     // 5.size
     Set.prototype.size = ()=>{
         return Object.keys(this.items).length
     }
     // 6 values 获取集合所以值的方法
     Set.prototype.values = ()=>{
         return Object.keys(this.items)
     }
     
     // 7. union 并集
     Set.prototype.union = otherSet =>{
         let unionSet = new Set()

         let values = this.values()

         for(let i =0;i<values.length;i++){
             unionSet.add(values[i])
         }

         values = otherSet.values()

         for(let i =0;i<values.length;i++){
             unionSet.add(values[i])
         }

         return unionSet
     }

     // 8 intersection 交集
     Set.prototype.intersection = otherSet=>{
         let intersection = new Set()

         let values = this.values()

         for(let i = 0;i<values.length;i++){
             if(otherSet.has(values[i])){
                 intersection.add(values[i])
             }
         }
         return intersection
     }

     // 9 difference  差集
     Set.prototype.difference = otherSet=>{
         let difference = new Set()

         let values = this.values()
         for(let i =0;i<values.length;i++){
             if(!otherSet.has(values[i])){
                 difference.add(values[i])
             }
         }
         return difference
     }

     //  subset 子集
     Set.prototype.subset = otherSet=>{
         let values = this.values()
         for(let i = 0 ;i<values.length;i++){
             if(!otherSet.has(values[i])){
                 return false
             }
         }
         return true
     }

 }