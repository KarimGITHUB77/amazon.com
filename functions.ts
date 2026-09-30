// create a function
function login(name: string, password: string): string {
    return `Hello, ${name}! Your password is ${password}.`;
}
console.log(login("karim", "123456"));

function add(a: string, b: string): string {
    return a + b;
}
console.log(add("New, ", "code for functions in TypeScript!"));

// A class that groups Karim's login, personal details, and hobbies methods.
class Karim {
    login1(name: string, password: string): string {
        return `Hello, ${name}! Your password is ${password}.`;
    }

    personalDetails(age: number, city: string): string {
        return `Karim is ${age} years old and lives in ${city}.`;
    }

    hobbies(hobby1: string, hobby2: string): string {
        return `Karim's hobbies are ${hobby1} and ${hobby2}.`;
    }
}

const karim = new Karim();
console.log(karim.login1("karim", "123456"));
console.log(karim.personalDetails(30, "Cairo"));
console.log(karim.hobbies("reading", "swimming"));
//functions with rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));
//functions with optional parameters
function greet(name: string, greeting?: string): string {
    if (greeting) {     
        return `${greeting}, ${name}!`;
    } else {
        return `Hello, ${name}!`;
    }           
}
console.log(greet("Karim"));
console.log(greet("Karim", "Welcome")); 
//functions with default parameters
function multiply(a: number, b: number = 1): number {
    return a * b;
}       
console.log(multiply(5)); // Uses default value for b
console.log(multiply(5, 2)); // Overrides default value for b       

//functions with rest parameters and optional parameters
function createUser(name: string, age?: number, ...hobbies: string[]): string {
    let userInfo = `Name: ${name}`;
    if (age) {
        userInfo += `, Age: ${age}`;
    }       
    if (hobbies.length > 0) {
        userInfo += `, Hobbies: ${hobbies.join(", ")}`;
    }
    return userInfo;
}

console.log(createUser("Karim"));
console.log(createUser("Karim", 30));
console.log(createUser("Karim", 30, "reading", "swimming"));

