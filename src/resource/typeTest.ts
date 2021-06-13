let anyTest:any = 4
let numberTest:number = 4
let objectTest:object = { 
    a: 1
}

function test():void {
    console.log(`any's number toFixed : ${anyTest.toFixed()}`)
    console.log(`number toFixed : ${numberTest.toFixed()}`)
}

export default {
    test
}