const win = {
    setInterval(callback: () => void, delay: number) {
        // 保存开始时间
        let startTime = Date.now()
        // 保存this
        const that = this
        const loop = () => {
            that.timer = requestAnimationFrame(loop)
            const now = Date.now()
            if (now - startTime >= delay) {
                callback()
                startTime = Date.now()
            }
        }
        this.timer = requestAnimationFrame(loop)
        return this.timer
    },
    clearInterval() {
        cancelAnimationFrame(this.timer)
    },
    timer:null
}
win.setInterval(() => {
    console.log(1)
}, 1000)

// 手写call
/***
 * 
 * function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// Expected output: "cheese"
 */
Function.prototype.call = function(self, ...args) {
    if(typeof this !== "function") {
        throw "nedd function"
    }
    // ctx 指定为 null 和 undefined 的 this 值会自动指向全局对象
    const ctx = self || window
    const fnName = Symbol("fnName")
    ctx[fnName] = this
    const result = ctx[fnName](...args)
    delete ctx[fnName]
    return result
}

Function.prototype.call = function(content) {
    const ctx = content ? Object(content) : window
    ctx.fn = this
    const args:string[] = []
    for(let i = 1; i < arguments.length; i ++) {
        args.push("arguments[" + i + "]")
    }
    const result =  eval('context.fn(' + args +')');
    delete ctx.fn
    return result
}
Function.prototype.apply = function(self, args) {
    if(typeof this !== "function") {
        throw "nedd function"
    }
    const ctx = self || window
    const fnName = Symbol("fnName")
    ctx[fnName] = this
    const result = ctx[fnName](args)
    delete ctx[fnName]
    return result
}
Function.prototype.apply = function(content, arg) {
    const ctx = Object(content) || window
    ctx.fn = this
    let result
    if(!arg) {
        result = content.fn()
    }else{
        let args:string[] = []
        for(let i = 0; i < arg.length; i ++) {
            args.push("arg[" + i + "]")
        }
        result = eval("content.fn(" + args + ")")
    }
    delete ctx.fn
    return result
}