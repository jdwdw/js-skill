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
