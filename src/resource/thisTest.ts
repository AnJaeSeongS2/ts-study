class A {
    a:string
    b:string
    constructor(a:string, b:string) {
        this.a = a
        this.b = b
    }
    showThis() {
        console.log('A class\'s showThis() :')
        console.log(this)
    }
}
function showThis() {
    console.log('global showThis() :')
    console.log(this)
}

export default {
    test: function() {
        let a = new A("aaa", "bbb")
        a.showThis()
        showThis()
    }
}
