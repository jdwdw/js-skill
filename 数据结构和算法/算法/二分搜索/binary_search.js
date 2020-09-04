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