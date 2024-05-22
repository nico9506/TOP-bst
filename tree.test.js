import { Tree } from "./Tree.js";

const inputArray = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 99)
);

console.log(inputArray);

const treeTest = new Tree(inputArray);

// console.log(inputArray); // Sorted array
Tree.prettyPrint(treeTest.root);

// new Item
const newItem = Math.floor(Math.random() * 99);
console.log(`Test: Insert new item --> value=${newItem}`);
treeTest.insert(newItem);
Tree.prettyPrint(treeTest.root);
