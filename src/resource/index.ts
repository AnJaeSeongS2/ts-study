// interface is only exist on TS
// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }
//
// const jaeseong = {
//     name: "jaeseong",
//     age: 20,
//     gender: "male"
// }

import axiosTest from './axiosTest'
import enumTest from './enumTest'
import typeTest from './typeTest'
class Human {
    public name:string
    public gender:string
    public age:number
    constructor(name:string, gender:string, age:number) {
        this.name = name
        this.gender = gender
        this.age = age
    }
}

const sayHi = (person:Human):string => {
    return `Hello ${person.name} is ${person.gender}, ${person.age} old`
}

const jaeseong = new Human("jaeseong", "male", 31)
console.log(sayHi(jaeseong))

enumTest.out()
enumTest.outMeta()
typeTest.test()
axiosTest.getSearchedArticleList()
class A {
    a:string
    b:string
    constructor(a:string, b:string) {
        this.a = a
        this.b = b
    }
    getA:() => string = () => {
        console.log(this)
        return this.a
    }
    showThis() {
        console.log(this)
    }
}

let a = new A("aaa", "bbb")
a.getA()
a.showThis()


export {}