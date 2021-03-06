//1.https://www.cnblogs.com/EganZhang/p/6594830.html
//2.https://segmentfault.com/a/1190000017000988
// 详细版的单链 http://ahuntsun.top/navitem/algorithm/theory/notes/3.html#_2-3-insert-position-element


/**
 * @description 简易版的链表中的Node
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

//------------------详细版单链--------------------------------//
function LinkList(){
    // 节点类
    function Node(data){
        this.data = data
        this.next = null
    }

    // 属性
    this.head = null
    this.length = 0

    //方法
    //1. append方法 在后面添加  
    LinkList.prototype.append = data =>{
        let newNode = new Node(data)

        //情况一只有一个节点
        if(this.length === 0 ){
            this.head = newNode
        }else{
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }
        this.length +=1
    }

    //2. toString 方法
    LinkList.prototype.toString = ()=>{
        let current = this.head
        let res = ''

        while(current){
            res += current.data + ' '
            current = current.next
        }
        return res
    }

    // 3.  insert 方法 插入一个新节点
    LinkList.prototype.insert = (position,data)=>{
        //边界判断
        if(position<0 || position>this.length){
            return false
        }

        let newNode = new Node(data)

        // 插在头
        if(position == 0){
            newNode.next = this.head
            this.head = newNode
        }else{
            let index = 0
            let previous = null
            let current = this.head
            // 插入时要找到前一个节点，去更改前一个节点的next
            while(index < position){
                previous = current
                current = current.next
                index++
            }
            newNode.next = current
            previous.next = newNode
        }
        this.length +=1
        return true
    }

    // 4. get方法
    LinkList.prototype.get = (position)=>{
        // 边界判断 
        if(position<0 || position>= this.length){
            return null
        }

        let current = this.head
        let index = 0
        while(index< position){
            current = current.next
            index++
        }
        return current.data
    }

    // 5. indexOf 方法
    LinkList.prototype.indexOf = data=>{
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

    // 6. update 方法
    LinkList.prototype.update = (position,NewData) =>{
        // 边界
        if(position<0 || position>=this.length){
            return false
        }

        let current = this.head
        let index = 0

        while(index<position){
            current = current.next
            index++
        }
        current.data = NewData
        return true
    }

    // 7. removeAt
    LinkList.prototype.removeAt = (position)=>{
        // 边界
        if(position<0 || position>=this.length){
            return null
        }

        let current = this.head
        if(position ==0){
            this.head = this.head.next
        }else{
            let index = 0
            let previous = null
            while(index<position){
                previous = current
                current = current.next
                index++
            }
            previous.next = current.next
        }
        this.length -=1
        return current.data
    }

    // remove
    LinkList.prototype.remove = data=>{
        let position = this.indexOf(data)
        return this.removeAt(position)
    }
    // isEmpty
    LinkList.prototype.isEmpty=()=>{
        return this.length === 0
    }
    // size
    LinkList.prototype.size = ()=>{
        return this.length
    }
}

/**
 * 链反转（迭代方法）
 */
function reverseList(node){
    if(node){
        let arr = []
        while(node){
            arr.unshift(node)
            node = node.next
        }
        for(let i = 0;i<arr.length;i++){
            arr[i].next=arr[i+1]
        }
        return arr[0]
    }
}

/**
 * 用递归方式做链反转 （和迭代解法相比，虽然时间复杂度都是 O(N)，但是迭代解法的空间复杂度是 O(1)，而递归解法需要堆栈，空间复杂度是 O(N)）
 * https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/2.2-shou-ba-shou-shua-lian-biao-ti-mu-xun-lian-di-gui-si-wei/di-gui-fan-zhuan-lian-biao-de-yi-bu-fen#yi-di-gui-fan-zhuan-zheng-ge-lian-biao
 */

 /**
  * 1.反转整条链
  * @param {*} node 
  */
 function reverse(node){
     //base
     if(node.next === null) return node

     const last = reverse(node.next)
     node.next.next = node
     node.next = null
     return last
 }

 /**
  * 2.反转前n个
  */
 let mapNode = null
 function reverseN(node,n){
     // base
     if(n==1){
        mapNode = node.next
        return node
     }

     const last = reverseN(node,n-1)
     node.next.next = node
     node.next = mapNode
     return last
 }

 /**
  * 3反转第 m 到 n 个
  */
 function reverseMtoN(node,m,n){
     // base
     if(m==1){
         return reverseN(node,n)
     }
     // 前进到反转的起点触发 base case
    node.next = reverseMtoN(node.next,m-1,n-1)
    return node
 }

 /**
  * K个一组反转链 
  * https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/2.2-shou-ba-shou-shua-lian-biao-ti-mu-xun-lian-di-gui-si-wei/k-ge-yi-zu-fan-zhuan-lian-biao
  */

  // 1.反转整条链路
  function reverse(a){
      let pre = null
      let cur = a
      let next = a
      while(cur !=null){
          next = cur.next
          // 逐个节点反转
          cur.next =pre
          // 更新指针位置
          pre = cur
          cur = next
      }
      return pre
  }

  // 2.反转由节点a 到 节点b  反转区间 [a, b) 的元素，左闭右开
  function reverseAtoB(a,b){
      let pre = null
      let cur = a
      let next = a
      while(cur !=b){
          next =cur.next
          cur.next = pre
          pre = cur
          cur = next
      }
      return pre
  }

  // 3. K个一组反转
  function reverseKGroup(node,k){
      // base 
      if(node == null) return node
      //反转区间 [a, b) 的元素，左闭右开
      let a = node
      let b = node
      for(let i = 0;i<k;i++){
          // 不足 k 个，不需要反转，base case
          if(b===null) return node
          b = b.next
      }
      // 先反转前k个
      const newNode = reverseAtoB(a,b)
      a.next = reverseKGroup(b,k)
      return newNode
  }


  /**
   * 判断回文链
   * https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/2.2-shou-ba-shou-shua-lian-biao-ti-mu-xun-lian-di-gui-si-wei/pan-duan-hui-wen-lian-biao
   */

   function isPalindrome(head){
    const array = []
    while(head!==null){
        array.push(head.val)
        head = head.next
    }
    for(let i =0,j=array.length-1;i<j;i++,j--){
        if(array[i]!==array[j]){
            return false
        }
    }
    return true

   }


