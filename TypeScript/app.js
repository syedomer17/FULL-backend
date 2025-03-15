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
    email: "syedomerali2006@gmail.com"
};
console.log(person.name);
var user = {
    name: "omer",
    age: 19,
    email: "omerali.code@gmail.com"
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
        return (+a) + (+b);
    }
    else {
        return a.toString() + b.toString();
    }
}
console.log(com(10, 20, "as-number"));
console.log(com("Syed", "omer", "as-string"));
