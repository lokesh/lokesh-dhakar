---
title: "Iterators in Javascript"
date: 2018-11-02
layout: post.njk
---

https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript


```

forEach works with Array, Map, Set
for of works with Array, Map, Set, String, Object

// ARRAY
Loop through array | for (let i = 0; i < arr.length; i++) { ... }       |
                   | for (const item of arr) { ... }                    | Slower and no access to index.
                   | for (const [index, item] of arr.entries()) { ... } | Slower
                   | arr.forEach((item, index) => { ... })              | Slowest?
Return a new array | let newArr = arr.map(item => item * 2)

// OBJECT
Keys and values  | for (let [key, value] of Object.entries(veggies)) { ... }
                 | for (let key of Object.keys(veggies)) { veggies[key] }
                 | for (const prop in obj) { if (obj.hasOwnProperty(prop)) { ... } }
Just the keys    | for (let val of Object.keys(veggies)) { ... }
Just the values  | for (let val of Object.values(veggies)) { ... }
                 
// MAP
Keys and values | myMap.forEach((value, key) => { ... })
                | for (const [key, value] of myMap) { ... })

// SET
Values | mySet.forEach((item) => { ... })
       | for (let item of mySet) { ... }

// STRING
Values | for (let char of str) { ... }


Loop through all props, | for (const prop in obj) {}
incl. from  prototypes
                   
```


