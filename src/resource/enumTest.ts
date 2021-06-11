// same as 
// var Color;
// (function (Color) {
//     Color[Color["Red"] = 1] = "Red";
//     Color[Color["Blue"] = 2] = "Blue";
//     Color[Color["Green"] = 4] = "Green";
// })(Color || (Color = {}));

enum Color {
    Red = 0b1,
    Blue = 0b10,
    Green = 0b100,
}

let c:Color = Color.Red
let cName:string = Color[0b100].toString()

function out():void {
    console.log(c)
    console.log(cName)
    console.log(Color)
}

export default out