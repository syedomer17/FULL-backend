// Basic
// primitive types (number , string , boolean)
//Arrays
//Tuples
//Enums
//Any,unknown,void,Null,undefiend,never
// there are two types of  data types in typescript primitive data type and reference data type
// primitive data type
// there are three way to create a variable var let const but don't use var
var age = 18;
var names = "Syed omer ali";
var isStudent = true;
// TypeScript ensures that age will only hold numbers, name will always be a string, and isStudent will only be true or false.
// arrays
// what is array ?
//An array is a collection of values of the same type.
var arrays = [1, 2, 3, 4, 5];
var array2 = ["h", "e", "l", "l", "o"];
//The [ ] means this is an array. Every element in arrays must be a number, and every element in array2 must be a string.
//Tuples
//A tuple is like an array, but it has a fixed number of elements, and each element has a specific type.
var arr = ["syed", 18];
//Here, person[0] must be a string, and person[1] must be a number. You can't swap them!
//Enums
//Enums allow you to define a set of named constants.
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["notFound"] = 404] = "notFound";
    Status[Status["error"] = 500] = "error";
})(Status || (Status = {}));
var serverResponse = Status.notFound; //so the value of serverRsopnse will be 404
// Any, Unknown, Void, Null, Undefined, Never
var me = "hello";
me = 1;
me = true;
//Can hold any type of value (not recommended) and any disables TypeScript's type checking.
//unknown Similar to any, but TypeScript forces you to check the type before using it.
var value = "hello";
if (typeof value === "string") {
    console.log(value.toUpperCase()); // Allowed because we checked the type
}
//void Used for functions that don’t return a value.
function sayHello() {
    console.log("hi i am omer");
}
// There are three types of data types Number String Boolean
var num = 123;
var Name = "Syed Omer Ali";
var isAlive = true;
function sum(a, b) {
    console.log(a + b);
}
sum(10, 20);
var data = undefined;
var nlllal = null;
var person = {
    name: "syed omer ali",
    age: 18,
    email: "syedomerali2006@gmail.com",
};
console.log(person.name);
var user = {
    name: "omer",
    age: 19,
    email: "omerali.code@gmail.com",
};
// what is array ?
//array is the collection of the values
var arra = ["syed", "omer", "ali"];
//tupels
var role = ["omer", 18];
var Role;
(function (Role) {
    Role[Role["admin"] = 0] = "admin";
    Role[Role["superAdmin"] = 1] = "superAdmin";
    Role[Role["user"] = 2] = "user";
})(Role || (Role = {}));
console.log(Role);
var de = 10;
de = "hello";
function combin(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    else {
        return a.toString() + b.toString();
    }
}
console.log(combin(10, 20));
console.log(combin("Syed", "omer"));
//literal
function com(a, b, type) {
    if (type === "as-number") {
        return +a + +b;
    }
    else {
        return a.toString() + b.toString();
    }
}
console.log(com(10, 20, "as-number"));
console.log(com("Syed", "omer", "as-string"));
var a = 10;
var b = "Hi";
var c = undefined;
console.log(a, b, c);
//void
function printData() {
    var date = new Date();
    console.log("Hello TypeScript!", date);
}
printData();
//unknown
// when we don't now any type we use unknown we can also assign any to it but unknown is safe option for it .
//In TypeScript, any and unknown are both used to represent values of any type, but they have key differences in terms of
// safety and usage:
/*
any (Unsafe, No Type Checking)
The any type disables type checking completely.
You can perform any operation on an any type without TypeScript errors.
This can lead to runtime errors because TypeScript won't warn you about incorrect operations.

let value: any;

value = "Hello";
console.log(value.toUpperCase()); // ✅ Works

value = 10;
console.log(value.toFixed(2)); // ✅ Works

value = true;
console.log(value.trim()); // ❌ No TypeScript error, but runtime error!


TypeScript allows invalid operations (like true.trim()), leading to potential runtime crashes.

 unknown (Safer, Requires Type Checking)
The unknown type is safer than any because you must check the type before using it.
You cannot perform operations on an unknown type without narrowing its type first.

let value: unknown;

value = "Hello";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe
}

value = 10;
if (typeof value === "number") {
  console.log(value.toFixed(2)); // ✅ Safe
}

value = true;
console.log(value.trim()); // ❌ TypeScript Error: Property 'trim' does not exist on type 'unknown'.

Feature	       any (Unsafe)	                                                    unknown (Safe)
Type Checking	 ❌ No checks	                                                    ✅ Requires type checks
Operations	   ✅ Allowed on any type	                                          ❌ Must check type first
Safety	      ❌ Unsafe (Runtime Errors)	                                        ✅ Safer (Compile-time Checks)
Best          Use Case	When migrating JavaScript to TypeScript (temporary use)  	When handling unknown API responses or dynamic data
*/
// let dataOfunknown : any;
// dataOfunknown = 10;
// dataOfunknown = "10";
// let item : string;
// item = dataOfunknown
// no error
var dataOfunknown;
dataOfunknown = 10;
dataOfunknown = "10";
var item;
if (typeof dataOfunknown === "string") {
    //item = dataOfunknown to do this we need if condition for it
    item = dataOfunknown;
}
//never
function apiError(msg, code) {
    throw { message: msg, apiError: code }; // Throwing an error object
}
console.log(apiError("server side error", 500)); // This will crash the program
//How include and exclude a file?
/*
go to tsconfig.json add this lines at last
"exclude":["fileName"]//this file will do gnore and it will does't complied
*/
// class
var newPerson = /** @class */ (function () {
    function newPerson(name, age) {
        this.name = name;
        this.age = age;
    }
    newPerson.prototype.greet = function () {
        console.log("Hello i am ".concat(this.name, " and my age is ").concat(this.age));
    };
    console.log(newPerson)
    return newPerson;
}());
var person1 = new newPerson("omer", 18);
person1.greet();
console.log(person1)
//Properties (name, age): Variables that store data.
//Constructor (constructor(name, age)): Special method that runs when an object is created.
//Method (greet()): A function inside a class.
