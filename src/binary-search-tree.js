// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
const Queue = require('./queue-helper');

class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  // Wraps the input value in a new BinarySearchTree and
  // assigns it to either the left or right subtree,
  // depending on its value
  insert(value) {
    const newTree = new BinarySearchTree(value);
    let currentNode = this;
    while (currentNode != null) {
      if (value <= currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newTree;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newTree;
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // Checks the binary search tree for the input target
  // Can be written recursively or iteratively
  contains(target) {
    let currentNode = this;
    while (currentNode != null) {
      if (target === currentNode.value) {
        return true;
      }
      if (target <= currentNode.value) {
        if (currentNode.left === null) {
          return false;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          return false;
        }
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  // Traverses the tree in a depth-first manner, i.e. from top to bottom
  // Applies the given callback to each tree node in the process
  depthFirstForEach(cb) {
    cb(this.value);

    if (this.left !== null) {
      this.left.depthFirstForEach(cb);
    }

    if (this.right !== null) {
      this.right.depthFirstForEach(cb);
    }
  }

  // Traverses the tree in a breadth-first manner, i.e. in layers, starting
  // at the root node, going down to the root node's children, and iterating
  // through all those nodes first before moving on to the next layer of nodes
  // Applies the given callback to each tree node in the process
  // You'll need the queue-helper file for this. Or could you roll your own queue
  // again. Whatever floats your boat.
  breadthFirstForEach(cb) {
    const queue = new Queue();
    queue.enqueue(this);
    cb(this.value);

    this.queueProcessor(queue, cb);
  }

  /* eslint-disable class-methods-use-this */
  queueProcessor(queue, cb) {
    const currentNode = queue.dequeue();

    if (currentNode.left !== null) {
      queue.enqueue(currentNode.left);
      cb(currentNode.left.value);
    }

    if (currentNode.right !== null) {
      queue.enqueue(currentNode.right);
      cb(currentNode.right.value);
    }

    if (!queue.isEmpty()) {
      currentNode.queueProcessor(queue, cb);
    }
  }
}

module.exports = BinarySearchTree;
