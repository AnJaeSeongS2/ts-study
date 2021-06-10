// interface is only exist on TS
interface Human {
    name: string,
    age: number,
    gender: string
}

const jaeseong = {
    name: "jaeseong",
    age: 20,
    gender: "male"
}

const sayHi = (human: Human): string => {
    return `hello ${human.name} is ${human.gender}, ${human.age} old`
}

sayHi(jaeseong)

export {}