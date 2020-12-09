// https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/er-fen-cha-zhao-xiang-jie#si-luo-ji-tong-yi

/**
 * @description 搜索一个数
 * @param {Array} nums 
 * @param {Number} target 
 */
function binary_search( nums,target){
    let left = 0;
    let right = nums.length-1;
    while(left<=right){
        let mid = left + Math.floor((right-left)/2)
        if(nums[mid]<target){
            left = mid +1
        }else if(nums[right]>target){
            right = mid -1
        }else if(nums[mid]===target){
            return mid
        }
    }
    return -1 
}

/**
 * @description 二分搜索左边界
 * @param {Array} nums 
 * @param {Number} target 
 */
function left_bound(nums,target){
     let left =0;
     let right = nums.length -1;
     while(left<=right){
         let mid = left + Math.floor((right-left)/2)
         if(nums[mid]< target){
             left = mid +1
         }else if(nums[mid]>target){
             right = mid -1
         }else if(nums[mid]===target){
             // 锁定左边界，右边界迫近
             right = mid -1
         }
     }
     // left越界情况处理
     if(left>nums.length || nums[left] !== target){
         return -1
     }
     return left
}

/**
 * @description 二分搜索右边界
 * @param {Array} nums 
 * @param {Number} target 
 */
function right_bound(nums,target){
    let left = 0;
    let right = nums.length -1;
    while(left <= right){
        let mid = left + Math.floor((right - left)/2)
        if(nums[mid]< target){
            left = mid +1
        }else if(nums[mid]>target){
            right = mid -1
        }else if(nums[mid]=== target){
            // 锁右边界，左边界不断迫近
            left = mid + 1 
        }
    }
    // right 越界情况处理
    if(right<0 || nums[right]!==target){
        return -1
    }
    return right
}


//--------------使用-----------------//
// https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/2.5-shou-ba-shou-shua-shu-zu-ti-mu/koko-tou-xiang-jiao



/**
 * @description 875. 爱吃香蕉的珂珂
 * https://leetcode-cn.com/problems/koko-eating-bananas/
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function(piles, H) {
    const maxSpeed = Math.max(...piles)

    // 1.暴力解法
    // for(let i = 1;i<maxSpeed;i++){
    //     if(canFinish(piles,i,H)){
    //         return i
    //     }
    // }
    // return maxSpeed

    // 2. 二分查找解法
    let left = 1
    let right = maxSpeed
    while(left<=right){
        let mid = left + Math.floor((right-left)/2)
        if(canFinish(piles,mid,H)){
            right = mid -1
        }else{
            left = mid+1
        }
    }
    if(left<1 ){
        left = maxSpeed
    }
    return left

};

var canFinish = function(piles,speed,H){
    let time = 0
    piles.forEach(pile => {
        time = time + ( Math.floor(pile/speed)) + (pile%speed ===0? 0:1 )
    });
    return time<=H
}



/**
 * @description 1011. 在 D 天内送达包裹的能力
 * https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
    const minW = Math.max(...weights)
    const maxW = weights.reduce((pre,cur)=>{
        return pre + cur
    })
    let left = minW
    let right = maxW
    while(left<=right){
        let mid = left + Math.floor((right-left)/2)
        if(canFinish(weights,mid,D)){
            right = mid -1
        }else{
            left = mid +1
        }
    }
    if(left< minW){
        left = maxW
    }
    return left

};

var canFinish = function(weights,mid,D){
    let index = 0
    for(let day = 0;day<D;day++){
        let maxCap = mid
        while( maxCap - weights[index]>=0){
            maxCap = maxCap - weights[index]
            index++
            if(index === weights.length){
                return true
            }
        }
    }
    return false
}


