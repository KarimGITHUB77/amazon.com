let names:string[] = [];
names[0]="karim";
names[1]="mohamed";
names[2]="sara";
names[3]="mohamed";
console.log(names)  
console.log(names.length)
console.log(typeof names)

//another way to declare array
let numbers:Array<number> = [1, 2, 3, 4, 5];
console.log(numbers)
console.log(numbers.length)
console.log(typeof numbers)

//generic array
let genericArray: Array<string | number> = ["apple", "banana", "cherry", "hgf", 1, 2, 3];
console.log(genericArray)
console.log(genericArray.length)
console.log(typeof genericArray)
console.log(genericArray[0])
console.log(genericArray[4])    

let karimDetails: [string, number, string] = ["Karim", 30, "Cairo"];
console.log(karimDetails [2])
console.log(karimDetails.length)
