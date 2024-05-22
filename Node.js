export const Node = class {
    /**
     * Node structure definition. Used to build the binary tree data structure
     * @param {string} data - Data stored in the node
     * @param {Node} leftChild - Left child node linked to this
     * @param {Node} rightChild - Right child node linked to this
     */

    #data;
    #leftChild;
    #rightChild;

    constructor(data = null, leftChild = null, rightChild = null) {
        this.#data = data;
        this.#leftChild = leftChild;
        this.#rightChild = rightChild;
    }

    toString() {
        return `val:${this.#data} [lCh:${
            null === this.#leftChild ? null : this.#leftChild.data
        }, rCh:${null === this.#rightChild ? null : this.#rightChild.data}]`;
    }

    // Getters and Setters
    get data() {
        return this.#data;
    }

    get leftChild() {
        return this.#leftChild;
    }

    get rightChild() {
        return this.#rightChild;
    }

    set data(newData) {
        this.#data = newData;
    }

    set leftChild(newNode) {
        this.#leftChild = newNode;
    }

    set rightChild(newNode) {
        this.#rightChild = newNode;
    }
};
