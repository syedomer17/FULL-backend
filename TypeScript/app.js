"use strict";
// Basic
// primitive types (number , string , boolean)
//Arrays
//Tuples
//Enums
//Any,unknown,void,Null,undefiend,never
// there are two types of  data types in typescript primitive data type and reference data type
// primitive data type
// there are three way to create a variable var let const but don't use var
let age = 18;
let names = "Syed omer ali";
let isStudent = true;
// TypeScript ensures that age will only hold numbers, name will always be a string, and isStudent will only be true or false.
// arrays
// what is array ?
//An array is a collection of values of the same type.
let arrays = [1, 2, 3, 4, 5];
let array2 = ["h", "e", "l", "l", "o"];
//The [ ] means this is an array. Every element in arrays must be a number, and every element in array2 must be a string.
//Tuples
//A tuple is like an array, but it has a fixed number of elements, and each element has a specific type.
let arr = ["syed", 18];
//Here, person[0] must be a string, and person[1] must be a number. You can't swap them!
//Enums
//Enums allow you to define a set of named constants.
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["notFound"] = 404] = "notFound";
    Status[Status["error"] = 500] = "error";
})(Status || (Status = {}));
let serverResponse = Status.notFound; //so the value of serverRsopnse will be 404
// Any, Unknown, Void, Null, Undefined, Never
let me = "hello";
me = 1;
me = true;
//Can hold any type of value (not recommended) and any disables TypeScript's type checking.
//unknown Similar to any, but TypeScript forces you to check the type before using it.
let value = "hello";
if (typeof value === "string") {
    console.log(value.toUpperCase()); // Allowed because we checked the type
}
//void Used for functions that don’t return a value.
function sayHello() {
    console.log("hi i am omer");
}
