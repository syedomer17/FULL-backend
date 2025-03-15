// Basic
// primitive types (number , string , boolean)
//Arrays
//Tuples
//Enums
//Any,unknown,void,Null,undefiend,never

// there are two types of  data types in typescript primitive data type and reference data type

// primitive data type

// there are three way to create a variable var let const but don't use var

let age: Number = 18;
let names: string = "Syed omer ali";
let isStudent: boolean = true;
// TypeScript ensures that age will only hold numbers, name will always be a string, and isStudent will only be true or false.

// arrays
// what is array ?
//An array is a collection of values of the same type.
let arrays: Number[] = [1, 2, 3, 4, 5];
let array2: string[] = ["h", "e", "l", "l", "o"];
//The [ ] means this is an array. Every element in arrays must be a number, and every element in array2 must be a string.

//Tuples
//A tuple is like an array, but it has a fixed number of elements, and each element has a specific type.
let arr: [string, Number] = ["syed", 18];
//Here, person[0] must be a string, and person[1] must be a number. You can't swap them!

//Enums
//Enums allow you to define a set of named constants.
enum Status {
  success = 200,
  notFound = 404,
  error = 500,
}

let serverResponse: Status = Status.notFound; //so the value of serverRsopnse will be 404

// Any, Unknown, Void, Null, Undefined, Never

let me: any = "hello";
me = 1;
me = true;

//Can hold any type of value (not recommended) and any disables TypeScript's type checking.

//unknown Similar to any, but TypeScript forces you to check the type before using it.

let value: unknown = "hello";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Allowed because we checked the type
}

//void Used for functions that don’t return a value.

function sayHello(): void {
  console.log("hi i am omer");
}

// There are three types of data types Number String Boolean 

const num : Number = 123;
const Name : String = "Syed Omer Ali";
const isAlive : Boolean = true;

function sum(a:number,b:number):void{
  console.log(a + b);
}
sum(10,20)

let data : undefined = undefined;
let nlllal : null = null

const person : {name:string,age:number,email:string} = {
  name  : "syed omer ali",
  age: 18,
  email : "syedomerali2006@gmail.com"
}
console.log(person.name)

type obj = {name:string,age:number,email:string}

const user : obj = {
  name:"omer",
  age:19,
  email:"omerali.code@gmail.com"
}

// what is array ?
//array is the collection of the values 

let arra : string[] = ["syed","omer","ali"]

//tupels 

let role : [string,number] = ["omer",18]