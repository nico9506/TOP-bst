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

        console.log(sortedArray);

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

    deleteItem(value) {
        /**
         * @param {number} value - Numeric value (node) to delete
         * @returns {Node} Parent node if the operation was performed, otherwise null
         */
        const nodeToDelete = this.find(value);

        // Node does not exist in bTree
        if (null === nodeToDelete) return null;

        const leftChild = nodeToDelete.leftChild;
        const rightChild = nodeToDelete.rightChild;
        const parentNode = this.#findParentNode(value);

        // No-branches node (leaf node)
        // Only remove node
        if (null === leftChild && null === rightChild) {
            if (
                null !== parentNode.leftChild &&
                value === parentNode.leftChild.data
            )
                parentNode.leftChild = null;

            if (
                null !== parentNode.rightChild &&
                value === parentNode.rightChild.data
            )
                parentNode.rightChild = null;

            return parentNode;
        }

        // one-branch node
        // connect childNode with parentNode and remove node
        if (null === leftChild || null === rightChild) {
            if (null !== leftChild) {
                leftChild.data < parentNode.data
                    ? (parentNode.leftChild = leftChild)
                    : (parentNode.rightChild = leftChild);
            } else {
                rightChild.data < parentNode.data
                    ? (parentNode.leftChild = rightChild)
                    : (parentNode.rightChild = rightChild);
            }

            nodeToDelete.leftChild = null;
            nodeToDelete.rightChild = null;
            nodeToDelete.data = null;

            return parentNode;
        }

        // two-branch node
        // it's replaced by the greater closest value and delete the used node
        if (null !== leftChild && null !== rightChild) {
            let newNodeToDelete = nodeToDelete.rightChild;
            let isNode = true;

            while (isNode) {
                // Look for the closest value
                null !== newNodeToDelete.leftChild
                    ? (newNodeToDelete = newNodeToDelete.leftChild)
                    : (isNode = false);
            }

            const val = Number(newNodeToDelete.data);

            this.deleteItem(newNodeToDelete.data);

            nodeToDelete.data = val;
        }
    }

    #findParentNode(value) {
        /**
         * @param {number} value - Input value to look for its parent node within the tree
         * @returns {Node} Parent node. Null in case the Tree does not include that value or the node does not have a parent node
         */

        // Root node, does not have parent node
        if (value === this.#root.data) return null;

        let tmpNode = this.#root;

        while (null !== tmpNode) {
            if (
                (null !== tmpNode.leftChild &&
                    value === tmpNode.leftChild.data) ||
                (null !== tmpNode.rightChild &&
                    value === tmpNode.rightChild.data)
            )
                return tmpNode;

            tmpNode =
                value < tmpNode.data ? tmpNode.leftChild : tmpNode.rightChild;
        }

        return null;
    }

    find(value) {
        /**
         * @param {number} value - Input value to look for within the tree
         * @returns {Node} Node which own value match with the provided one.
         * Null in case the Tree does not include it
         */

        let tmpNode = this.#root;

        while (null !== tmpNode) {
            if (value === tmpNode.data) return tmpNode;

            tmpNode =
                value < tmpNode.data ? tmpNode.leftChild : tmpNode.rightChild;
        }

        return null;
    }

    levelOrder(callback) {
        /**
         * Traverse the tree in breadth-first level order and provide each node as an 
	 * argument to the callback. As a result, the callback will perform an operation 
	 * on each node following the order in which they are traversed.
         * @param {function} callback - (Optional) Function used to process every node value
         * @returns callback output, otherwise returns an array of values if no callback 
	 * function is provided
         */

	    if (this.#root === null) return null;

	    let tmpNode = this.#root;

	    const checkedNodes = [];
	    const q = [];
	   
	    // Push the first node in the queue
	    q.push(tmpNode);

	    // Loop is executed if there is at least one listed node to process
	    while(q.length > 0) {
		    tmpNode = q[0];

		    if(tmpNode.leftChild !== null) q.push(tmpNode.leftChild);
		    if(tmpNode.rightChild !== null) q.push(tmpNode.rightChild);

		    if(callback) {
			    try {
				    callback(tmpNode.data);
			    } catch(err) {
				    console.error(`Error in callback function. /n msg: ${err}`)}
		    } else {
			    checkedNodes.push(tmpNode.data);
		    }

		    // Removes the first element (already checked) in queue
		    q.shift();

	    }

	    return callback ? null : checkedNodes;
		
    }


	inOrder(callback) {
		/**
		 * In-order tree traversal algorithm
		 * @param {function} callback - Each node value is provided as input to the
		 * input function
		 * @returns {Array} Null if callback is provided, otherwise Array of 
		 * the visited nodes
		 */

		if(this.#root === null) return null;

		const checkedNodes = [];

		function inorder(node) {
			/**
			 * In-order traversal algorithm using recursion
			 * @param {Node} node - Node structure
			 */

			if(node === null) return;

			inorder(node.leftChild);
			
			callback ? callback(node.data) : checkedNodes.push(node.data);

			inorder(node.rightChild);

		}
		
		inorder(this.#root);

		return callback ? null : checkedNodes;
	}

    static height(node) {
        /**
         * returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
         */
        // let tmpNode = node;
        // let stack = [];
        // let height = 0;
        // const checkLeftBranches = (node) => {
        //     while (null !== tmpNode.leftChild || null !== tmpNode.rightChild) {
        //         height++;
        //     }
        //     return;
        // };
    }

    // Getters and Setters
    get root() {
        return this.#root;
    }
};
