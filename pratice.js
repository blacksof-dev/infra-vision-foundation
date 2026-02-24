

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

const a = { x: 1, y: 2 };
const b = { x: 1, y: 2 };

const keys1 = Object.keys(a);
const keys2 = Object.keys(b)

for (let key of keys1) {
  if (a[key] !== b[key]) {
    return false;
  }
}

