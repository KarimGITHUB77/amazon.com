//string operations
let str1="typescript";
let str2="is great";

let splitStr1=str1.split(" ");
let splitStr2=str2.split(" ");
console.log(splitStr1);
console.log(splitStr2);
let joinedStr=splitStr1.concat(splitStr2).join(" ");
console.log(joinedStr);
let slicedStr=joinedStr.slice(0, 10);
