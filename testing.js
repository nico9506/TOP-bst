import { Tree } from "./Tree.js";

const inputArray = Array.from({ length: 31 }, () =>
    Math.floor(Math.random() * 999)
);

console.log(inputArray);

const treeTest = new Tree(inputArray);

console.log(inputArray);
treeTest.prettyPrint(treeTest.root);
