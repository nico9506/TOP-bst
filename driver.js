import { Tree } from "./Tree.js";

//Create a binary search tree from an array of random numbers < 100.
const inputArray = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
);

const treeTest = new Tree(inputArray);

Tree.prettyPrint(treeTest.root);

// Confirm that the tree is balanced by calling isBalanced.
console.log(`isBalanced: ${treeTest.isBalanced()}`);

// Print out all elements in level, pre, post, and in order.
console.log(`LevelOrder: ${treeTest.levelOrder()}`);
console.log(`preOrder: ${treeTest.preOrder()}`);
console.log(`postOrder: ${treeTest.postOrder()}`);
console.log(`inOrder: ${treeTest.inOrder()}`);

// Unbalance the tree by adding several numbers.
for (let i = 0; i < 100; i++) {
    treeTest.insert(Math.floor(Math.random() * 1000));
}

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(`(After adding items) isBalanced: ${treeTest.isBalanced()}`);

// Balance the tree by calling rebalance.
treeTest.rebalance();

// Confirm that the tree is balanced by calling isBalanced.
console.log(`(After rebalancing) isBalanced: ${treeTest.isBalanced()}`);

// Print out all elements in level, pre, post, and in order.
console.log(`LevelOrder: ${treeTest.levelOrder()}`);
console.log(`preOrder: ${treeTest.preOrder()}`);
console.log(`postOrder: ${treeTest.postOrder()}`);
console.log(`inOrder: ${treeTest.inOrder()}`);
