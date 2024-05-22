import { Tree } from "./Tree.js";

const inputArray = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 99)
);

console.log(inputArray);

const treeTest = new Tree(inputArray);

// console.log(inputArray); // Sorted array
Tree.prettyPrint(treeTest.root);

// new Item test
// const newItem = Math.floor(Math.random() * 99);
// console.log(`Test: Insert new item --> value=${newItem}`);
// treeTest.insert(newItem);
// Tree.prettyPrint(treeTest.root);

// find(value) test
// console.log(
//     `find(${inputArray[0]}) => returns ${treeTest.find(inputArray[0])}`
// );
// console.log(
//     `find(${inputArray[3]}) => returns ${treeTest.find(inputArray[3])}`
// );
// console.log(
//     `find(${inputArray[8]}) => returns ${treeTest.find(inputArray[8])}`
// );
// console.log(`find(${1995}) => returns ${treeTest.find(1995)}`);
