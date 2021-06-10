const name = "nicolas", age = 20, gender = "male"
const sayHi = (name:string, age:number, gender?:string):string => {
    return `hello ${name} is ${gender}, ${age} old`
}

sayHi(name, age, gender)

export {}