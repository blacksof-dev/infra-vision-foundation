/* 
    Access key only
    const arr = { id: 1, name: "A" };
    Object.entries(arr).forEach(([key,value])=>{
      console.log(key,value);
    })



/*

Count Number of Keys - 
const obj = { a: 1, b: 2, c: 3 }
console.log(Object.keys(obj).length);

*/

/* Check if Object is Empty
const obj = {key:'aditi'}
console.log(Object.keys(obj).length===0);

 */

/* Merge Two Objects

const obj1 = { a: 1, b: 2 }
const obj2 = { b: 3, c: 4 }

const mergedObj = {...obj1,obj2};
console.log(mergedObj);
*/

/* Swap Keys and Values

const obj = { a: 1, b: 2 };
Object.entries(obj).forEach(([key,value])=>{
    console.log(value,':', key)
})

*/

// Remove duplicate object from the array

/* const arr = [
  1,{ id: 1, name: "A" },
  2,{ id: 2, name: "B" },
  1,{ id: 1, name: "A" }
];


const unique = [
  ...new Map(arr.map(item => [item.id, item])).values()
];

console.log(unique);

*/

// Sum of Numeric Values in Object

/*
const obj = { a: 10, b: 20, c: 30 };

const totalSum = Object.values(obj);

let sum =0;

totalSum.forEach((ele)=>{
  sum = sum+ele;
  return sum;
})

console.log(sum);

*/

// Flatten Nested Object

/*
function flattenObject(obj,parent='',result={}){
  for(let key in obj){
    const newKey = parent? `${parent}.${key}`: key
     if(typeof obj[key]==='object' && obj[key]!=null){
       flattenObject(obj[key],newKey,result)
     }
     else{
       result[newKey] = obj[key];
     }   
  }
  return result;
}

const obj = { a: 1, b: { c: 2, d: 3 ,e:{f:4}} };

console.log(flattenObject(obj));

*/

// Compare Two Objects

// const a = { x: 1, y: 2 };
// const b = { x: 1, y: 2 };

// const keys1 = Object.keys(a);
// const keys2 = Object.keys(b)

// for (let key of keys1) {
//   if (a[key] !== b[key]) {
//     return false;
//   }
// }

//Remove property with the null value

// const obj = {
//   name:"Aditi",
//   age:null,
//   city:"bhopal"
// }

// for(let key in obj){
//   if(obj[key]===null){
//     delete obj[key];
//   }
// }

// console.log(obj);

//Count the frequency using the Object
// const obj = [
//     "InfraPandit",
//     "InfraShakti",
//     "InfraPandit",
//     "InfraKatha",
//     "InfraShakti",
//   ];

//   const map = new Map();
//   obj.forEach((ele, index) => {
//     if (map.has(ele)) {
//       map.set(ele, map.get(ele) + 1);
//     } else {
//       map.set(ele, 1);
//     }
//   });

// Find the larget value in Object

// const obj = {
//   c: 23,
//   a: 54,
//   b: 45,
// };

// const array = Object.values(obj);
// console.log(Math.max(...array));

// Max value in nested object

// const obj = {
//   a: 10,
//   b: {
//     c: 25,
//     d: {
//       e: 40,
//       f: 55,
//     },
//   },
//   g: 15,
// };

// let maxValue = -Infinity;
// function findMaxInNestedObject(obj: any) {
//   for (let key in obj) {
//     if (obj[key] > maxValue) {
//       maxValue = obj[key];
//     } else if (typeof obj[key] === "object") {
//       findMaxInNestedObject(obj[key]);
//     }
//   }
//   return maxValue;
// }

// console.log(findMaxInNestedObject(obj));

// Problem N

// Return:

//  Top 1 highest salary user from entire database

// Write solution

/*





Check if two strings are anagrams.
Capitalize first letter of each word.
Count word frequency in sentence.
Find longest word in a sentence.
Check if string contains only digits.
Check if number is prime.
Generate Fibonacci series.
Find factorial of a number.
Check Armstrong number.
Reverse a number.
Check palindrome number.
Find GCD and LCM.
Count digits in number.
Sum of digits.
Power of number
Deep clone an object.
Compare two objects
Convert object to query string.
Group array of objects by property.
Sort array of objects by key.
Remove duplicate objects from array.
Find most frequent property value.
Reverse string using recursion.
Sum of nested array values
Factorial using recursion.
Fibonacci using recursion.
Implement your own:map,filter,reduce
Debounce function.
Throttle function.
Polyfill for bind.
Polyfill for call and apply.
Implement Promise from scratch (basic).
Event emitter implementation.
LRU cache implementation.
Memoization function.
Infinite currying function.
OTP input logic.
Multi step form validation.
Shopping cart total calculation.
Cart item quantity update.
Pagination logic.
Search filtering.



  function rotateArray(arr: number[], value: number) {
    while (value > 0) {
      let valus = arr.shift();
      arr.push(valus);
      value--;
    }
    return arr;
  }

  console.log(rotateArray([1, 2, 3, 4, 5], 2));


arr1 = [1, 2, 3, 4]
arr2 = [3, 4, 5, 6]
[1, 2, 3, 4, 5, 6]
*/

//Method -1

// function mergeArray(arr1, arr2) {
//   const set = new Set();
//   const mergedArray = [...arr1, ...arr2];
//   mergedArray.forEach((ele) => {
//     set.add(ele);
//   });
//   return set;
// }

//Method - 2

// function mergedArray(arr1, arr2) {
//   const arr = [];

//   arr1.forEach((ele) => {
//     arr.push(ele);
//   });

//   arr2.forEach((ele) => {
//     if (!arr.includes(ele)) {
//       arr.push(ele);
//     }
//   });

//   return arr;
// }

// console.log(mergedArray([1, 2, 3, 4], [3, 4, 5, 6]));

// function reverseString(str) {
//   let arr = str.toString().split("");
//   console.log(arr);
//   let start = 0;
//   let end = str.length - 1;

//   while (start < end) {
//     let temp = arr[start];
//     arr[start] = arr[end];
//     arr[end] = temp;
//     start++;
//     end--;
//   }
//   return arr.join("");
// }

// console.log(reverseString(142));

// function ckeckPalindrome(str) {
//   let reverse = reverseString(str);
//   if (reverse === str) {
//     return true;
//   }
//   return false;
// }

//Using Map

// function firstNonRepeatingCharacter(str) {
//   const map = new Map();
//   for (let ele in str) {
//     if (!map.has(str[ele])) {
//       map.set(str[ele], 1);
//     } else {
//       let value = map.get(str[ele]);
//       map.set(str[ele], value + 1);
//     }
//   }

//   for (let [key, value] of map) {
//     if (value === 1) {
//       return key;
//     }
//   }
// }

// function firstNonRepeatingCharacter(str) {
//   for (let i = 0; i < str.length; i++) {
//     if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
//       return str[i];
//     }
//   }
// }

// console.log(firstNonRepeatingCharacter("swiss"));

// function removeDuplicate(str) {
//   let set = new Set();
//   for (let ele in str) {
//     set.add(str[ele]);
//   }

//   return set;
// }

// console.log(removeDuplicate("swiss"));

// function removeDuplicate(str) {
//   let newStr = "";
//   for (let i = 0; i < str.length; i++) {
//     if (!newStr.includes(str[i])) {
//       newStr = newStr + str[i];
//     }
//   }
//   return newStr;
// }

// console.log(removeDuplicate("swiss"));

// function reverseNumber(num) {
//   let start = 0;
//   let end = num.length - 1;
//   while (start < end) {
//     let temp = num[start];
//     num[start] = num[end];
//     num[end] = temp;
//     start++;
//     end--;
//   }
//   return num;
// }

// console.log(reverseNumber(142));

//let arr = [1, 2, 3, 3, 4, 3, 3, 1, 1, 2];
// Output - [4,2,1,3]

// function findUnique(arr) {
//   let newArr = [];
//   const map = new Map();
//   for (let ele of arr) {
//     if (!map.has(ele)) {
//       map.set(ele, 1);
//     } else {
//       let value = map.get(ele);
//       map.set(ele, value + 1);
//     }
//   }

//   const sorted = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
//   for (let [key, value] of sorted) {
//     newArr.push(key);
//   }
//   return newArr;
// }

// console.log(findUnique(arr));

let arr = [2, 4, 3, 5, 7, 8, 9];
let targetValue = 7;
function findPair(arr, targetValue) {}

console.log(findPair(arr, targetValue));

// Optimization related questions

// what is the bundler?
/*

Ans - bundler is a tool 
 - that takes multiple file
 - understand their dependencies
 - bundle them into a single file and optimise them
  - this single optimse file is send to the browser.
   popular bundlers: webpack,vite,rolup,turbopack,parcel

  Why Bundler exists?
  Browser dont understand the ts,jsx,tailwind,modern js
  so bundler solve all these problems

  How bundler work internally 

  1. Start from the entry file (like index.js)
  2.Parse the file and create AST (Abstract syntax tree)
      AST allow the bundler to understand the ocdee like - 
      1. Detect the import
      2. Detech the exports,
      3. detech the unused code,
      4. Transform the code.
  3. Build the dependency graph
  4. Loaders / Transformers Run
  5. Convert Everything Into Modules
  6: Bundle Generation
  7. Optimization Phase
     1. tree shaking
     2. Minification
     3. Dead Code Elimination
     4. Code Splitting
  8. Output Files
*/

/*

2. Difference between the webpack,rollup,vite
     
webpack : 
Builds entire dependency graph
Bundles everything
Serves bundle
Uses in-memory filesystem

Rollup
Designed for:Clean ES module bundling



Vite
This is the modern approach.
Instead of bundling everything:
Uses native ES modules in browser
Serves files on demand
Uses esbuild for fast transformation

*/

/*
3. What is babel

Babel is the javascript compiler
Different browsers support different JS features.
Modern JavaScript → Older JavaScript
JSX → Regular JavaScript
TypeScript → JavaScript

*/

/*

 How does Hot Module Replacement work?
 Ans - Hot Module Replacement allows updating modules in the browser:
        Without full page reload
        Without losing application state
        Almost instantly

Without HMR:
You edit a file
Browser reloads
State resets
You lose form input, scroll position, etc.

With HMR:
You edit a file
Only that module updates
App state remains



Edit file
   ↓
File watcher detects change
   ↓
Bundler rebuilds changed module
   ↓
Dependency graph finds affected modules
   ↓
Dev server pushes update via WebSocket
   ↓
Browser runtime swaps module
   ↓
App re-renders only affected parts


Watching files
Rebuilding only changed module
Using dependency graph to find affected modules
Sending update via WebSocket
Replacing module in browser runtime
Preserving app state



React Fast Refresh - HMR
- Keeps component state
- Preserves hooks state



*/

/*

What Is a Monorepo?
A single Git repository that contains multiple projects or packages.

*/
