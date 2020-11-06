/**
 * 双向链表 
 * https://www.cnblogs.com/AhuntSun-blog/p/12441095.html
 */

 function DoubleLinkList(){
     function Node (data){
         this.data = data
         this.prev = null
         this.next = null
     }

     // 属性
     this.head = null // 头
     this.tail = null // 尾
     this.length = 0
 }

//--------------在尾部添加--------------------//
/**
 * 在尾部添加
 * @param {*} data 
 */
 DoubleLinkList.prototype.append = data =>{
     let newNode = new Node (data)
     
     if(this.length == 0){
        // 情况1: 添加的是第一个节点
         this.head = newNode
         this.tail = newNode
     }else { 
        // 情况2: 添加的不是第一个节点
         newNode.prev = this.tail
         this.tail.next = newNode
         this.tail = newNode

     }
     
     this.length +=1
 }

 //--------------toString相关--------------------//
 /**
  * 将链表变成字符串
  */
 DoubleLinkList.prototype.toString = ()=>{
     return this.backwardStirng()
 }

 // 由尾部到头部
 DoubleLinkList.prototype.forwardString = ()=>{
     let current = this.tail
     let resultString = ''

     while(current){
         resultString += current.data + '--'
         current = current.prev
     }
     return resultString
 }

 // 由头到尾部
 DoubleLinkList.prototype.backwardString = ()=>{
     let current = this.head
     let resultString = ''

     while(current) {
        resultString += current.data + '--'
        current = current.next
     }
     return resultString
 }

//--------插入节点-----------//
DoubleLinkList.prototype.insert = (position,data)=>{
    // 1.越界判断
    if(position < 0 || position > this.length) return false

    // 2.创建新节点
    let newNode = new Node(data)

    // 3. 插入新节点
    //原链表为空
    //情况1
    if(this.length ==0){
        this.head = newNode
        this.tail = newNode
    }else{
        //原链表不为空
        //情况2  position ==0
        if(position ==0){
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
        //情况3 position == this.length
        }else if(position == this.length){
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        // 情况4 0 < position < this.length
        }else{
            let current = this.head 
            let index = 0 
            while (index<position){
                current = current.next
                index++
            }

            newNode.next = current
            newNode.prev = current.prev

            current.prev.next = newNode
            current.prev = newNode
            
        }
    }
    this.length +=1
    return true
}

//--------get----------//
DoubleLinkList.prototype.get = position=>{
    //1 越界判断
    if(position < 0 || position>=this.length){
        return null
    }
    // 2. 获取元素
    let current = null
    let index =0 
    
    // 为了减少遍历的次数 可以分从前和后两种
    if((this.length/2)>position){
        current = this.head
        while(index < position){
            current = current.next
            index++
        }
    }else{
        current = this.tail
        index = this.length -1
        while(index>position){
            current = current.prev
            index--
        }
    }
    return current.data
}

//-----indexOf---------//

DoubleLinkList.prototype.indexOf = data =>{
    let current = this.head
    let index = 0

    while(current){
        if(current.data === data){
            return index
        }
        current = current.next
        index++
    }
    return -1
}

//-------update---------//
DoubleLinkList.prototype.update = (position,newDate)=>{
    //1. 越界判断
    if(position < 0 || position>=this.length){
        return false
    }

    //2.寻找节点
    let current = null 
    let index = 0
    if(this.length/2>position){
        current = this.head
        while(index<position){
            current = current.next
            index++
        }
    }else{
        current = this.tail 
        index = this.length -1 
        while(index> position){
            current = current.prev
            index--
        }
    }
    
    current.data = newDate
    return true
}


//----------removeAt-----------//
DoubleLinkList.prototype.removeAt = position=>{
    // 1.越界判断
    if(position< 0 || position >= this.length){
        return null
    }

    //2 删除节点
    //情况1:链表只有一个节点
    let current = this.head
    if(this.length ===1){
        this.head = null
        this.tail = null
    }else{
        //情况2: 删除第一个节点
        if(position ===0){
            this.head.next.prev = null
            this.head = this.head.next
        // 情况3: 删除最后一个节点
        }else if(position === this.length -1){
            current = this.tail 
            this.tail.prev.next = null
            this.tail = this.tail.prev
        // 情况4: 删除中间节点
        }else{
            let index =0
            while(index<position){
                current = current.next
                index++
            }
            current.prev.next = current.next
            current.next.prev = current.prev
        }
    }

    this.length -=1
    return current.data
}

//-----其他方法-------//
DoubleLinkList.prototype.remove = data=>{
    let index = this.indexOf(data)
    return this.removeAt(index)
}

DoubleLinkList.prototype.isEmpty = ()=>{
    return this.length ==0
}

DoubleLinkList.prototype.size = ()=>{
    return this.length
}

DoubleLinkList.prototype.getHead = ()=>{
    return this.head.data
}

DoubleLinkList.prototype.getTaile = ()=>{
    return this.tail.data
}