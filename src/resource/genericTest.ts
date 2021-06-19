function identity<T>(arg: T): T {
    return arg;
}

function identityArray<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

export default {
    test: function() {
        let output = identity<string>("stringValue");
        console.log(output);
        let outputGeneric = identity("stringValue");
        console.log(outputGeneric);
        let outputArray = identityArray<string>(["stringValue", "stringValue2"]);
        console.log(outputArray);
        let outputArrayGeneric = identityArray(["stringValue", "stringValue2"]);
        console.log(outputArrayGeneric);
    }
}