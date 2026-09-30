// TypeScript Datatypes examples — runnable with `tsx Datatypes.ts`

console.log("TypeScript datatypes examples start")

// 1) Primitives
let num: number = 42
let str: string = "hello world"
let bool: boolean = true
let nul: null = null
let undef: undefined = undefined
let sym: symbol = Symbol("id")
let big: bigint = 9007199254740991n
console.log({ num, str, bool, nul, undef, sym, big })

// 2) Arrays & Tuples
let nums: number[] = [1, 2, 3]
let strs: Array<string> = ["a", "b", "c"]
let pair: [string, number] = ["age", 30]
console.log({ nums, strs, pair })

// 3) Enum
enum Color {
  Red,
  Green = 5,
  Blue,
}
let color: Color = Color.Green
console.log({ Color, color })

// 4) Any, Unknown, Never
let anything: any = { x: 1 }
anything = "now a string"
let unknownVar: unknown = 10

function throwError(message: string): never {
  throw new Error(message)
}

// Demonstrate narrowing `unknown` with a type guard
if (typeof unknownVar === "number") {
  console.log("unknownVar is number", unknownVar + 1)
}

// 5) Object, type alias, and interface
type Person = {
  name: string
  age?: number
}

const alice: Person = { name: "Alice" }

interface Animal {
  readonly species: string
  speak(): void
}

const dog: Animal = {
  species: "Dog",
  speak() {
    console.log("woof")
  },
}
console.log({ alice, dog })

// 6) Function types
function add(a: number, b: number): number {
  return a + b
}
const concat: (a: string, b: string) => string = (x, y) => x + y
console.log(add(2, 3), concat("foo", "bar"))

// 7) Union & Intersection
type ID = number | string
function printId(id: ID) {
  if (typeof id === "string") console.log(id.toUpperCase())
  else console.log(id)
}
printId("abc123")
printId(987)

type A = { a: number }
type B = { b: number }
type AB = A & B
const both: AB = { a: 1, b: 2 }
console.log(both)

// 8) Literal types
type Direction = "up" | "down" | "left" | "right"
let dir: Direction = "up"
console.log(dir)

// 9) Generics
function identity<T>(x: T): T {
  return x
}
console.log(identity<number>(123))

interface Box<T> {
  value: T
}
const box: Box<string> = { value: "boxed" }
console.log(box)

// 10) Utility types (Partial)
const partialPerson: Partial<Person> = { age: 25 }
console.log(partialPerson)

// 11) Promise / async example
function wait(ms: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`waited ${ms}ms`), ms))
}
wait(10).then((res) => console.log(res))

// 12) Classes & generics
class Stack<T> {
  private items: T[] = []
  push(item: T) {
    this.items.push(item)
  }
  pop(): T | undefined {
    return this.items.pop()
  }
}
const stack = new Stack<number>()
stack.push(1)
stack.push(2)
console.log(stack.pop())

// 13) Type assertions
const someVal: unknown = "lengthy"
const length1 = (someVal as string).length
console.log("length", length1)

// 14) never example (unreachable)
function exhaustiveCheck(x: never): never {
  return throwError(`Unhandled case: ${x}`)
}

console.log("TypeScript datatypes examples end")
