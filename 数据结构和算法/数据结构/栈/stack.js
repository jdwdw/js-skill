/**
 * @description 栈，先进后出，后进先出(受限的线性结构)
 */
function Stack(){
    this.items = []
}

// 把元素压入栈
Stack.prototype.push = function(element){
    this.items.push(element)
}

// 从栈中取出元素
Stack.prototype.pop = function(element){
    return this.items.pop()
}

//检测栈顶元素
Stack.prototype.peek = function(){
    return this.items[this.items.length -1]
}

// 栈是否为空
Stack.prototype.isEmpty = function(){
    return this.items.length === 0
}

// 栈中元素的个数
Stack.prototype.size = function(){
    return this.items.length
}

// toString():以字符串形式输出栈内数据
Stack.prototype.toString =function(){
    let res = ''
    for(let i of this.items){
        res += i + ' '
    }
    return res
}



//-------------------------------------//
//https://leetcode-cn.com/problems/next-greater-element-i/
/** 
 * @description  
 * 给定两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
    nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

    输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
    输出: [-1,3,-1]
    解释:
    对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
    对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
    对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/next-greater-element-i
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    if(!nums1 || !nums1.length) return []
    const stack = []
    const map = new Map()
    for(let i = 0;i<nums2.length;i++){
        while(stack.length>0 && nums2[i]>stack[stack.length-1]){
            map.set(stack.pop(),nums2[i])
        }
        stack.push(nums2[i])
    }
    const res = new Array(nums1.length).fill(-1)
    for(let i = 0;i< num1.length;i++){
        if(map.has(nums1[i])){
            res[i] = map.get(nums1[i])
        }
    }
    return res
};

//--------------------------//
//https://leetcode-cn.com/problems/daily-temperatures/
/**
 * @description 
 * 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
    例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
    提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/daily-temperatures
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    if(!T || !T.length ) return []
    const stack = []
    const res = new Array(T.length).fill(0)
    for (let i = T.length -1;i>=0;i--){
        while(stack.length>0 && T[i]>=T[stack[stack.length -1]]){
            stack.pop()
        }
        if(stack.length>0){
            res[i] = stack[stack.length -1] - i
        }
        stack.push(i)
    }
    return res
};