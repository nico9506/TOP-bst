import { Tree } from "./Tree.js";

const inputArray = Array.from({ length: 13 }, () =>
    Math.floor(Math.random() * 99)
);

const treeTest = new Tree(inputArray);

Tree.prettyPrint(treeTest.root);

// new Item test
// const newItem = Math.floor(Math.random() * 99);
// console.log(`Test: Insert new item --> value=${newItem}`);
// treeTest.insert(newItem);
// Tree.prettyPrint(treeTest.root);

// find(value) test
// (() => {
//     inputArray.forEach((num) => {
//         console.log(`find(${num}) => returns ${treeTest.find(num)}`);
//     });

//     console.log(`find(${1995}) => returns ${treeTest.find(1995)}`);
// })();

// findParentNode test (method turned private)
// (() => {
//     inputArray.forEach((num) => {
//         console.log(
//             `findParentNode(${num}) => returns ${treeTest.findParentNode(num)}`
//         );
//     });

//     console.log(
//         `findParentNode(${1995}) => returns ${treeTest.findParentNode(1995)}`
//     );
// })();

// Delete items
(() => {
    console.log(`Test: Delete item --> value=${inputArray[3]}`);
    treeTest.deleteItem(inputArray[3]);

    setTimeout(() => {
        console.log(`Test: Delete item --> value=${inputArray[9]}`);
        treeTest.deleteItem(inputArray[9]);
    }, 1500);

    setTimeout(() => {
        console.log(`Test: Delete item --> value=${inputArray[6]}`);
        treeTest.deleteItem(inputArray[6]);
    }, 3000);

    setTimeout(() => {
        Tree.prettyPrint(treeTest.root);
    }, 4500);
})();
