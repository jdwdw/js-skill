/**
 * 大顶堆
 * 
 */
function MaxHeap(array){
    // 开始最后一个非叶子节点
    let start = Math.floor(array.length/2 - 1)
    for (let i = start; i>=0;i--){
        createHead(array,i)
    }
    function createHead(array,index){
        // 左节点
        let leftNode = 2*index +1
        //右节点 
        let rightNode = 2*index +2
        let max = index
        // 比较子节点和根节点找最大
        if(leftNode<array.length && array[leftNode]>array[max]){
            max = leftNode
        }
        if(rightNode<array.length && array[rightNode]>array[max]){
            max = rightNode
        }
        // 交互位置
        if(max != index){
            let temp = array[max]
            array[max] = array[index]
            array[index] = temp
            //交换位置后，不确定该位置下是否还是大顶堆，需要重排
            createHead(array,max)
        }

    }
}

/**
 * 小顶堆
 */

 function MinHead(array){
     let start = Math.floor(array.length/2 - 1)
     for (let i = start; i>=0;i--){
         createHead(array,i)
     }
     function createHead(array,index){
         let leftNode = 2*index +1
         let rightNode = 2*index +2
         let min = index 
         if(leftNode < array.length && array[leftNode]<array[min]){
             min = leftNode
         }
         if(rightNode < array.length && array[rightNode]<array[min]){
             min = rightNode
         } 
         if(min != index){
             let temp = array[min]
             array[min] = array[index]
             array[index] = temp

             createHead(array,min)
         }
     }
 }

 //-------------------------------//
 /**
  * @description 通用封装实现
  */
 function Heap(type='min',value){
     this.type = type;
     this.value = []
 }
 Heap.prototype.create =function(values){
     const length = this.value.length
     const start = Math.floor(length/2)
     for(let i = start;i>=0;i--){
         this.ajust(i,length)
     }
 }
 Heap.prototype.ajust = function(index,length){
     const array = this.value;
     for(let i = 2*index+1;i<length;i=2*i+1){
         // i = 2*index+1 为左子叶
         // i+1 为 右子叶
        if(i+1<length){
             if((this.type ==="max"&&array[i+1]>array[i])||
                (this.type==="min"&&array[i+1]<array[i])){
                i++
             }
        }
        if((this.type ==='max'&&array[index]<array[i])||
            (this.type=='min'&&array[index]>array[i])){
            [array[index],array[i]] =[array[i],array[index]]
            index = i
        }else{
            break
        }
     }
 }
 Heap.prototype.add =function(element){
     const array = this.value
     array.push(element)
     if(array.length>1){
         let index = array.length-1
         let target = Math.floor((index-1)/2)
         while(target>=0){
            if((this.type==='min'&&array[index]<array[target])||
                (this.type === 'max'&& array[index]>array[target])){
                    [array[index],array[target]]= [array[target],array[index]]
                    index = target
                    target = Math.floor((index-1)/2)
            }else{
                break
            }
         }
     }
 }

 Heap.prototype.pop = function(){
     const array = this.value
     let result = null
     if(array.length>1){
         result = array[0]
         // 使用尾部元素填充头部
         array[0] = array.pop()
         this.ajust(0,array.length)
     }else if(array.length === 1){
         return array.pop()
     }
     return result
 }


 //demo
 var heap = new Heap('max');
 heap.add(6)
 heap.add(10)
 console.log(heap.value);
 console.log(heap.pop());
 console.log(heap.value);
 
//-------------------------------//

//----------数据流中位数--------------//
//https://leetcode-cn.com/problems/find-median-from-data-stream/
/**
 * 解法大顶堆和小顶堆，奇数时，小顶堆比大顶堆数量大1
 */
var MedianFinder = function() {
    this.count = 0
    this.maxHeap = new Heap('max')
    this.minHeap = new Heap('min')
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.count++
    if(this.count %2 === 1){
        this.maxHeap.add(num)
        this.minHeap.add(this.maxHeap.pop())
    }else{
        this.minHeap.add(num)
        this.maxHeap.add(this.minHeap.pop())
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if(this.count %2 ===1){
        return this.minHeap.value[0]
    }else{
        const result = (this.minHeap.value[0]+this.maxHeap.value[0])/2
        return result
    }
};

//----------------------------------//
/**
 * TOPK
 */
let findKthLargest = function(nums, k) {
    // 从 nums 中取出前 k 个数，构建一个小顶堆
    let heap = [], i = 0
    while(i < k) {
       heap.push(nums[i++]) 
    }
    buildHeap(heap, k)
    
    // 从 k 位开始遍历数组
    for(let i = k; i < nums.length; i++) {
        if(heap[0] < nums[i]) {
            // 替换并堆化
            heap[0] = nums[i]
            heapify(heap, k, 0)
        }
    }
    
    // 返回堆顶元素
    return heap[0]
};

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (arr, k) => {
    if(k === 1) return
    // 从最后一个非叶子节点开始，自上而下式堆化
    for(let i = Math.floor(k/2); i>=0 ; i--) {
        heapify(arr, k, i)
    }
}

// 堆化
let heapify = (arr, k, i) => {
    // 自上而下式堆化
    while(true) {
        let minIndex = i
        let left = 2*i+1
        let right = 2*i+2
        if(left <= k && arr[left] < arr[minIndex]) {
            minIndex = left
        }
        if(right <= k && arr[right] < arr[minIndex]) {
            minIndex = right
        }
        if(minIndex !== i) {
            swap(arr, i, minIndex)
            i = minIndex
        } else {
            break
        }
    }
}

// 交换
let swap = (arr, i , j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
