//////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////
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