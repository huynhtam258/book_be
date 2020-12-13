const { upperCase } = require('lodash');
var { author } = require('../model/author');
var { book } = require('../model/book')
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    find(value) {
        if (!this.root) return false;

        let current = this.root;
        let found = false;
        while (current && !found) {
            // console.log(current);
            if (value < current.value.name) {
                // console.log(current.value);
                current = current.left;
                // console.log(current)
            } else if (value > current.value.name) {
                current = current.right;
            } else {
                found = current;
                // console.log(found);
            }
        }

        if (!found) return undefined;
        return found;
    }

    insert(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (current) {
            if (value.name === current.value.name) return undefined;
            if (value.name < current.value.name) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    // tác giả
    findAuthor(value) {
        if (!this.root) return false;

        let current = this.root;
        let found = false;
        while (current && !found) {
            // console.log(current);
            if (value < current.value.authorName) {
                // console.log(current.value);
                current = current.left;
                // console.log(current)
            } else if (value > current.value.authorName) {
                current = current.right;
            } else {
                found = current;
                // console.log(found);
            }
        }

        if (!found) return undefined;
        return found;
    }

    insertAuthor(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (current) {
            if (value.authorName === current.value.authorName) return undefined;
            if (value.authorName < current.value.authorName) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    // 

    // tác giả
    findBook(value) {
        if (!this.root) return false;

        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value.bookName) {
                current = current.left;
            } else if (value > current.value.bookName) {
                current = current.right;
            } else {
                found = current;
            }
        }

        if (!found) return undefined;
        return found;
    }

    insertBook(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (current) {
            if (value.bookName === current.value.bookName) return undefined;
            if (value.bookName < current.value.bookName) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    // 

}

module.exports.findAuthor = (req, res) => {
    bts = new BinarySearchTree();
    author.find().select().exec((err, list) => {
        list.map(res => {
            bts.insertAuthor(res);
        })
        res.send(bts.findAuthor(req.params.name))
    })
}

module.exports.findBook = (req, res) => {
    bts = new BinarySearchTree();
    book.find().select().exec((err, list) => {
        list.map(res => {
            bts.insertBook(res);
        })
        res.send(bts.findBook(req.params.name))
    })
}