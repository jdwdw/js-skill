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