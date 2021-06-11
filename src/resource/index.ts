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

import enumTest from './enumTest'
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

enumTest()
export {}