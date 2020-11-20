/**
 * 二叉树
 */
function TreeNode(val){
    this.val = val
    this.left = null
    this.right = null
}

 // 一般套路
 function traverse( root ){
     // root 要做的操作
     traverse(root.left)
     traverse(root.right)
 }

 /**
  * example 1 
  * 所用节点加一
  * 
  */
 function plusOne (root){
     if(root === null) return
     root.val = root.val+1
     plusOne(root.left)
     plusOne(root.right)
 }

 /**
  * example 2
  * 判断两颗二叉树是否相同
  */
 function isSame(rootA,rootB){
     // 都为空 --相同
     if(rootA === null && rootB === null) return true
     // 其中一个空 --不相同
     if(rootA == null || rootB == null) return false
     // 都不为空，但是val不同 ---不相同
     if(rootA.val !== rootB.val) return false
     return isSame(rootA.left,rootB,left)&&isSame(rootA.right,rootB.right)
 }


//--------------搜索二叉树--------------------//
/**
* 二叉搜索树 (Binary Search Tree，简称 BST)
*/

//一般套路
function BST(root,target){
    //base
    if(root.val === target){
        // do some thing
    }
    if(root.val<target){
        BST(root.right,target)
    }
    if(root.val>target){
        BST(root.left,target)
    }
}

/**
*  example1 判断是否BST
*/
function isBST(root){
    return help(root,null,null)
}

function help(root,min,max){
    if(root === null) return true
    if( min !== null && root.val <= min.val) return false
    if(max !== null && root.val >= max.val) return false 
    return help(root.left,min,root)&&help(root.right,root,max)
}

/**
 * example2 判断一个数是否在二叉搜索树中
 */
function isInBST(root,target){
    if(root === null) return false
    if(root.val === target) return true
    if(root.val<target){
        return isInBST(root.right,target)
    }
    if(root.val>target){
        return isInBST(root.left,target)
    }

}

/**
 * example3 在二叉搜索树中添加一个数
 */

 function insertBST(root,target){
     if(root === null ) return new TreeNode(target)
     if(root.val < target){
         root.right = insertBST(root.right,target)
     }
     if(root.val > target){
        root.left =  insertBST(root.left, target)
     }
     return root
 }

 /**
  * example4 在二叉搜索树中删除一个数
  */
 function deleteNode(root,target){
     if(root === null) return null
     if( root.val === target){
        // 情况1.没有子节点直接返回空 (跟下面的情况代码作用重叠可以忽略)
        // if(root.left === null && root.right === null) return null 
        //情况 2.只有一个子节点，直接返回子节点
        if(root.left === null) return root.right
        if(root.right === null) return root.left
        //情况 3.有两个子节点
        // 获取左节点树最大点或者右节点树最小节点来替代自己
        const minNode = getMin(root.right)
        root.val = minNode.val
        root.right = deleteNode(root.right,minNode.val)

     }
     if(root.val<target){
        root.right = deleteNode(root.right,target)
     }if(root.val>target){
        root.left = deleteNode(root.left,target)
     }
     return root
 }

 function getMin(root){
     //BST最左边就是最小
     while(root.left !==null){ 
         root = root.left
    }
     return root
 }


 //---------封装搜索二叉树---------//
 //http://ahuntsun.top/navitem/algorithm/theory/notes/9.html#
 function BinarySearchTree(){
     // 节点内部类
    function Node (key){
        this.key = key
        this.left = null
        this.right = null
    }

    // 属性
    this.root = null

    // 方法
    // 一.插入数据 insert方法
    BinarySearchTree.prototype.insert = (key)=>{
        let newNode = new Node(key)

        //1.根节点不存在的情况
        if(this.root === null){
            this.root = newNode
        //2.根节点存在的情况
        }else{
            this._insertNode(this.root,newNode)
        }
    }
    BinarySearchTree.prototype._insertNode = (node,newNode)=>{
        // 向左查找
        if(newNode.key<node.key){
            //情况1:node无左节点直接插入
            if(node.left === null){
                node.left = newNode
            // 情况2: node 有左节点，递归 _insertNode方法直到无左子节点再插入
            }else{
                this._insertNode(node.left,newNode)
            }
        // 向右查找
        }else{
            // 情况1:node无右子节点，直接插入
            if(node.right === null){
                node.right = newNode
            // 情况2: node有右子节点 递归 _insertNode
            }else{
                this._insertNode(node.right,newNode)
            }

        }
    }

    //.树的遍历
    // 1.前遍历
    BinarySearchTree.prototype.preOrderTraversal = handler=>{
        this._preOrderTraversalNode(this.root,handler)
    }
    BinarySearchTree.prototype._preOrderTraversalNode = (node,handler)=>{
        if(node !=null){
            //1.处理经过节点
            handler(node.key)

            //2.遍历经过节点的左子节点
            this._preOrderTraversalNode(node.left,handler)

            //3.遍历经过节点的右子节点
            this._preOrderTraversalNode(node.right,handler)
        }
    }

    //2.中遍历
    BinarySearchTree.prototype.minOrderTraversal = handler=>{
        this._minOrderTraversalNode(this.root,handler)
    }
    BinarySearchTree.prototype._minOrderTraversalNode = (node,handler)=>{
        if(node !=null){

            this._minOrderTraversalNode(node.left,handler)

            handler(node.key)

            this._minOrderTraversalNode(node.right,handler)
        }
    }

    // 3.后遍历
    BinarySearchTree.prototype.postOrderTraversal = handler=>{
        this._postOrderTraversalNode(this.root,handler)
    }
    BinarySearchTree.prototype._postOrderTraversalNode = (node,handler)=>{
        if(node !=null){
            this._postOrderTraversalNode(node.left,handler)
            this._postOrderTraversalNode(node.right,handler)
            handler(node.key)
        }
    }

    //三.寻找值
    //1. 最大值
    BinarySearchTree.prototype.max =()=>{
        let node = this.root

        let key = null
        while(node!=null){
            key = node.key
            node = node.right
        }
        return key
    }
    //2.最小值
    BinarySearchTree.prototype.min = ()=>{
        let node = this.root

        let key = null
        while(node != null){
            key = node.key
            node = node.left
        }
        return key
    }
    // 3.查找对应key
    BinarySearchTree.prototype.search = (key)=>{
        let node = this.root

        while(node !=null){
            if(key<node.key){
                node = node.left
            }else if(key>node.key){
                node = node.right
            }else{
                return true
            }
        }
        return false
    }

    //四.删除节点 (用递归方法的话可以直接看上文的 deleteNode 方法)
    BinarySearchTree.prototype.remove = (key)=>{

        /*------1.寻找要删除节点------------*/
        //1.1.定义变量current保存删除的节点，parent保存它的父节点。isLeftChild保存current是否为parent的左节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        while(current.key !=key){
            parent = current
            if(key<current.key){
                isLeftChild = true
                current = current.left
            }else{
                isLeftChild = false
                current = current.right
            }
            if(current === null){
                return false
            }
        }
        //结束while循环后：current.key = key

        /*----------2.删除节点-------------*/
        //情况1:删除的是叶子节点（无子节点）
        if(current.left == null && current.right == null){
            if(current == this.root){
                this.root = null
            }else if(isLeftChild){
                parent.left = null
            }else{
                parent.right = null
            }
        }

        //情况2:删除的节点只有一个节点
        // 2.1 current有左子节点时
        else if(current.right == null){
            if(current == this.root){
                this.root = current.left
            }else if(isLeftChild){
                parent.left = current.left
            }else{
                parent.right = current.left
            }
        }
        // 3.2 current 有右子节点
        else if(current.left == null){
            if(current == this.root){
                this.root = current.right
            }else if(isLeftChild){
                parent.left = current.right
            }else{
                parent.right = current.right
            }
        }

        // 情况 3. 删除节点有两个子节点
        else{
            //1.获取后继节点
            let successor = this._getSuccessor(current)

            //2.判断是否为根节点
            if(current == this.root){
                this.root = successor
            }else if(isLeftChild){
                parent.left = successor
            }else{
                parent.right = successor
            }
            // 3. 将后继的左子节点改为被删除节点的左子节点
            successor.left =current.left
        }
    }

    // 查找后继的方法
    BinarySearchTree.prototype._getSuccessor = (delNode)=>{
        //1.定义变量，保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        // 2.循环查找current 的右子树节点
        while(current !=null){
            successorParent  =successor
            successor =current
            current = current.left
        }

        // 3. 判断寻找到的后继节点是否直接就是删除节点的right节点
        if(successor != delNode.right){
            // 后继节点父节点的左子节点置为后继节点的右子节点
            successorParent.left = successor.right
            // 后继节的的右节点，置为删除节点的右子节点
            successor.right = delNode.right
        }
        return successor
    }
    
    
 }