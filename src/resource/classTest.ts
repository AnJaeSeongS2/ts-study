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

export default {
    test: function() {
        const jaeseong = new Human("jaeseong", "male", 31)
        console.log(sayHi(jaeseong))
    }
}