//pop
let fruits = ["apple", "banana", "cherry"];
 fruits.pop();
 console.log(fruits); // Output: ["apple", "banana"]     
//push
let newLength = fruits.push("orange");
console.log(newLength); // Output: 3
console.log(fruits); // Output: ["apple", "banana", "orange"]
//shift
let firstFruit = fruits.shift();            
console.log(firstFruit); // Output: "apple"
console.log(fruits);

//unshift

let newLength2 = fruits.unshift("grape");
console.log(newLength2); // Output: 3
console.log(fruits); // Output: ["grape", "banana", "orange"]
//concat
let moreFruits = ["kiwi", "melon"];
let allFruits = fruits.concat(moreFruits);
console.log(allFruits); // Output: ["grape", "banana", "orange", "kiwi", "melon"]   
//splice
fruits.splice(1, 1, "blueberry", "strawberry");
console.log(fruits); // Output: ["grape", "blueberry", "strawberry", "orange"]
//slice
let slicedFruits = fruits.slice(1, 3);
console.log(slicedFruits); // Output: ["blueberry", "strawberry"]
//indexOf
let index = fruits.indexOf("orange");
console.log(index); // Output: 3
//includes
let hasBanana = fruits.includes("banana");
console.log(hasBanana); // Output: false
//join
let fruitString = fruits.join(", ");
console.log(fruitString); // Output: "grape, blueberry, strawberry, orange"
//reverse
fruits.reverse();
console.log(fruits); // Output: ["orange", "strawberry", "blueberry", "grape"]
//sort
fruits.sort();
console.log(fruits); // Output: ["blueberry", "grape", "orange", "strawberry"]
//map
let upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits); // Output: ["BLUEBERRY", "GRAPE", "ORANGE", "STRAWBERRY"] 
