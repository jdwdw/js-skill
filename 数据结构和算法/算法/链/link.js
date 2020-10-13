//1.https://www.cnblogs.com/EganZhang/p/6594830.html
//2.https://segmentfault.com/a/1190000017000988

/**
 * @description 链表中的Node
 * @param {*} val 
 */
function Node(val){
    this.val = val
    this.next = null
}

function linkList(){
    this.head = new Node('head')
}

linkList.prototype = {
    // 在链的最后添加节点
    append: function(newItem){
        let currentNode = this.head
        while(currentNode.next !==null){
            currentNode = currentNode.next
        }
        currentNode.next = new Node(newItem)

    },
    // 查找对应某一节点
    find:function(item){
        let currentNode = this.head
        while(currentNode.val !== item){
            currentNode = currentNode.next
        }
        return currentNode
    },
    // 在某节点后插入新节点
    insert:function(newItem,item){
        const newNode = new Node(newItem)
        const currentNode = this.find(item)
        newNode.next = currentNode.next
        currentNode.next = newNode
    },
    // 查找当前节点前一个节点
    findPrevious:function(item){
        let currentNode = this.head
        while((currentNode.next !== null)&&(currentNode.next.val !== item)){
            currentNode = currentNode.next
        }
        return currentNode
    },
    // 删除节点
    remove:function(item){
        let previous = this.findPrevious(item)
        if(previous.next !==null){
            previous.next = previous.next.next
        }
    },
    // 修改某节点数据
    edit:function(item,newItem){
        const currentNode = this.find(item)
        currentNode.val = newItem
    },
    display:function(){
        let currentNode = this.head
        while(currentNode.next !==null){
            console.log('val',currentNode.next.val);
            currentNode = currentNode.next
        }
    }
}
