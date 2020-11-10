function Dictionary(){
    // 属性
    this.items = {}

    // 方法
    //1. set 在字典中添加键值对
    Dictionary.prototype.set = (key,value)=>{
        this.items[key] = value
    }
    // 2. has 
    Dictionary.prototype.has = (key)=>{
        return items.hasOwnProperty(key)
    }
    // 3. remove
    Dictionary.prototype.remove = key=>{
        if(!this.has(key)){
            return false
        }

        delete this.items[key]

        return true
    }
    // 4.get
    Dictionary.prototype.get = key=>{
        return this.has(key) ? this.items[key] : undefined
    }
    //5 keys 
    Dictionary.prototype.keys = ()=>{
        return Object.keys(this.items)
    }

    // 6. size
    Dictionary.prototype.size = ()=>{
        return this.keys().length
    }
    // 7.clear 
    Dictionary.prototype.clear = ()=>{
        this.items = {}
    }
}