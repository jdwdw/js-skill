/**
 * 大顶堆排序
 */
function headSort (array,heapSize){
    buildMaxHead(array,heapSize)
    for(let i=heapSize-1;i>0;i--){
        swap(array,0,i)
        maxHeapify(array,0,i)
    }
}

/**
 * 创建大顶堆
 */
function buildMaxHead(array,heapSize){
    let start = Math.floor((heapSize-1)/2)
    for (let i = start;i>=0;i--){
        maxHeapify(array,i,heapSize)
    }
}

/**
 * 大顶堆调整
 */
function maxHeapify(array,index,heapSize){
    let max = index;
    let leftNode = 2*index +1;
    let rightNode = 2*index +2;
    if(leftNode < heapSize && array[leftNode] > array[max]){
        max = leftNode
    }
    if(rightNode < heapSize && array[rightNode] > array[max]){
        max =rightNode
    }
    if(max != index){
        swap(array,max,index)
        maxHeapify(array,max,heapSize)
    }
}

/**
 * 换位
 */
function swap(array,i,j){
    const temp = array[i];
    array[i]= array[j]
    array[j] = temp
}