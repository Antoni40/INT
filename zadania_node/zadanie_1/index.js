//3 w kolejce
setTimeout(() => {
    console.log("setTimeout worked");
})

//4 w kolejce
setImmediate(() => {
    console.log("setImmediate worked");
})

//2 w kolejce
new Promise((resolve, reject) => {
    resolve("Promise worked");
}).then((message) => {
    console.log(message);
})

//1 w kolejce
process.nextTick(() => {
    console.log("nextTick worked");
})

