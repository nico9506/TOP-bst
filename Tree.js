import { Node } from "./Node.js";

export const Tree = class {
    /**
     * Binary Tree Data Structure
     * @param {Array} inputArray - Numeric array to create the binary tree after being sorted and filtered by unique values
     */

    #root;

    constructor(inputArray) {
        this.#root = this.#buildTree(inputArray);
    }

    //Utils
    #buildTree(inputArray) {
        /**
         * A function that constructs Balanced Binary Search Tree from
         * the given numeric array
         * Taken from:
         * https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
         */

        if (inputArray.length === 0) return null;

        const sortedArray = Array.from(
            new Set(inputArray.sort((a, b) => a - b))
        );

        const mid = Math.floor(sortedArray.length / 2);
        const root = new Node(sortedArray[mid]);

        // Init queue
        const q = [
            [root, [0, mid - 1]],
            [root, [mid + 1, sortedArray.length - 1]],
        ];

        while (q.length > 0) {
            const [parent, [left, right]] = q.shift();

            // if there are elements to process and parent node is not NULL
            if (left <= right && parent != null) {
                const mid = Math.floor((left + right) / 2);
                const child = new Node(sortedArray[mid]);

                // set the child node as left or right child of the parent node
                if (sortedArray[mid] < parent.data) {
                    parent.leftChild = child;
                } else {
                    parent.rightChild = child;
                }

                // push the left and right child and their indices to the queue
                q.push([child, [left, mid - 1]]);
                q.push([child, [mid + 1, right]]);
            }
        }

        return root;
    }

    static prettyPrint(node, prefix = "", isLeft = true) {
        /**
         * Taken from:
         * theodinproject.com/lessons/javascript-binary-search-trees#project-solution
         */

        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            this.prettyPrint(
                node.rightChild,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
            this.prettyPrint(
                node.leftChild,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }

    insert(value) {
        let tmpNode = this.#root;
        let parentNode;

        while (null !== tmpNode) {
            parentNode = tmpNode;
            tmpNode =
                value < tmpNode.data ? tmpNode.leftChild : tmpNode.rightChild;
        }

        value < parentNode.data
            ? (parentNode.leftChild = new Node(value))
            : (parentNode.rightChild = new Node(value));
    }

    deleteItem(value) {}

    // Getters and Setters
    get root() {
        return this.#root;
    }
};
