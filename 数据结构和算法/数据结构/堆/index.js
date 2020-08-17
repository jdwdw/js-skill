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