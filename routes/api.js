const ctrlAdmin = require('../controller/admin.controller');
const jwtHelper = require('../config/jwtHelper');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const message = require('./../documents/messages');
var fs = require('fs');
// const jsonwebtoken = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');

/* #region AWS S3 */
const uploads3 = require('../services/file-upload');
// const singleUpload = uploads3.single('image'); // đây là key mà ta sẽ dùng trong formdata
/* #endregion */

/* #region Multer Upload file */
const multer = require('multer');
// Set desination and optional file name
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname); // Get theo ngày
        // callback(null, req.body.bookName + '.jpg'); // get theo tên sách
    }
});

const fileFilter = (req, file, callback) => {
    // reject file
    if (file.mimetype == 'image/jpg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};

// const upload = multer({ storage: storage });
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5 // giới hạn file 5mb
    },
    // fileFilter: fileFilter
});
/* #endregion */

/* #region Models  */
var { book } = require('../model/book');
var { reviewComment } = require('../model/comment');
var { bookCategory } = require('../model/bookCategory');
var { author } = require('../model/author');
var { childComment } = require('../model/childComment');
var tree = require('./tree');
// router link all api
router.post('/register', ctrlAdmin.register);
router.post('/login', ctrlAdmin.authenticate);
// router.get('/userProfile/:id', jwtHelper.verifyJwtToken, ctrlAdmin.userProfile);
router.get('/userProfile/:id', ctrlAdmin.userProfile);
router.put('/changePassword', ctrlAdmin.changePassword);
router.put('/updateProfile', ctrlAdmin.updateProfile);

router.get('/findAuthor/:name', tree.findAuthor);
router.get('/findBook/:name', tree.findBook);
router.get('/getall', getAllBook);
router.get('/getcmt', getComment);
router.get('/getcategory', getCategorys);
router.get('/getauthor', getAuthor);
router.post('/create', uploads3.single('file'), createBook );
router.get('/getbookcategory/:id', getBookByCategory);
router.get('/getbookauthor/:id', getBookByAuthor);
router.get('/:Id', getBookById);
router.post('/edit/:id', uploads3.single('file'), updateBook);
router.delete('/delete/:id', deleteBook);
router.post('/comment/post', postComment);
router.get('/getcmtbook/:bookId', getCommentByIdBook);
router.delete('/deleteComment/:id', deleteComment);
router.post('/category/post', createCategory);
router.delete('/deleteCategory/:id', deleteCategory);
router.post('/editCategory/:id', editCategory);
router.post('/createAuthor', uploads3.single('file'), createAuthor);
router.put('/editAuthor/:id', uploads3.single('file'), editAuthor);
router.get('/author/:Id', getAuthorById);
router.delete('/deleteAuthor/:id', deleteAuthor);
router.post('/childcomment/create', createChildComment);
router.get('/getchildcmt/:id', getChildCommentByIdComment);
router.delete('/deleteChildComment/:id', deleteChildComment);
// router.post('/addNode', tree.insert);
function deleteChildComment(req, res) {
    childComment.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc);
        }
        else {
            res.send({})
            // res.send(
            //     {
            //         success: false,
            //         status: 400,
            //         message: message.ERROR_MESSAGE.COMMENT.DELETE
            //     }
            // )
        }
    });
}
function getAllBook(req, res){
    book.find()
        .populate('author')
        .populate('category')
        .exec((err, book) => {
            if (err) {
                res.send({
                    status: 400,
                    message: message.ERROR_MESSAGE.BOOK.NOT_FOUND
                });
                return;
            }
            res.send(book);
        });
}

function getComment(req, res){
    reviewComment.find((err, reviewComment) => {
        if (err) {
            res.send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.COMMENT.NOT_FOUND
            });
            return;
        }
        res.json(reviewComment);
    });
}


function getCategorys(req, res) {
    bookCategory.find()
        .populate('books')
        .exec((err, lst) => {
            if (err) {
                res.send({
                    status: 400,
                    message: message.ERROR_MESSAGE.CATEGORY.NOT_FOUND
                });
                return;
            }
            res.json(lst);
        })
}

function getAuthor(req, res) {
    author.find()
        .populate('category')
        .exec((err, lst) => {
            if (err) {
                res.send({
                    status: 400,
                    message: message.ERROR_MESSAGE.AUTH.NOT_FOUND
                });
                return;
            }
            res.json(lst);
        });
}
// create a book

function createBook(req, res) {
    var AddBook = new book({
        bookName: req.body.bookName,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        bookContent: req.body.bookContent,
        image: req.file.location,
    })
    AddBook.save(err => {
        if (err) {
            res.status(400).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.BOOK.NOT_FOUND
            });
        } else {
            res.status(200).send({
                success: true,
                status: 400,
                message: message.SUCCESS_MESSAGE.BOOK.CREATED
            });
        }
    })
}
//GetAllBookByCategory

function getBookByCategory (req, res)  {
    book.find({ 'category': req.query.category }, (err, lst) => {
        if (err) {
            res.send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.CATEGORY.NOT_FOUND
            });
        }else{
            if(lst){
                book.find()
                    .populate('author')
                    .exec((err, result)=>{
                        res.send({
                            data:result.filter(res => res.author.category == req.params.id)
                        });
                    })
                // author.find({category:req.params.id})
                //     .exec((err, listAuthor)=>{
                //         if(!err){
                //             let listbook = [];
                //             listAuthor.map((author)=>{
                //                 book.find({category: author._id},
                //                     (err, book)=>{
                //                         if(!err) {
                //                             listbook.push(book)
                //                         };
                //                         res.send(listbook);
                //                     })
                //             })
                //         }else{
                //             // res.send({
                                
                //             // })
                //         }
                //     })
            }
        }
    });
}

function getBookByAuthor(req, res) {
    book.find({ 'author': req.params.id }, (err, lst) => {
        if (err) {
            res.send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.BOOK.NOT_FOUND
            });
        }
        res.json(lst);
    });
}
//GetBookById
function getBookById(req, res) {
    book.findById(req.params.Id)
        .populate('category')
        .exec((err, result) => {
            if (err)
                res.send({
                    success: false,
                    status: 400,
                    message: message.ERROR_MESSAGE.BOOK.NOT_FOUND
                })
            else
                res.send(result);
        })
}
/* #endregion */

function updateBook (req, res)  {
    book.findById(req.params.id, (err, update) => {
        if (err) {
            res.status(400).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.BOOK.NOT_FOUND
            })
        } else {
            // update.bookId = req.body.bookId,
            update.bookName = req.body.bookName,
                update.author = req.body.author,
                update.releaseDate = req.body.releaseDate,
                update.bookContent = req.body.bookContent
            // update.image = req.file.location
            if (req.file == undefined) {
                console.log('No image');
            } else {
                console.log('image', req.file.location);
                update.image = req.file.location
            }
            update.save((err, result) => {
                if (err) {
                    res.status(400).send({
                        success: false,
                        status: 400,
                        message: message.ERROR_MESSAGE.BOOK.UPDATE
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Book updated"
                    });
                }
            });
        }
    });
}

//Delete book
function deleteBook (req, res) {
    book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send({
                success: success,
                status: 200,
                message: message.SUCCESS_MESSAGE.BOOK.DELETED
            })
        }
    });
}

/* #endregion */

/* #region  Comment route */

function postComment (req, res)  {
    let addComment = new reviewComment({
        contentcomment: req.body.contentcomment,
        nameReviwer: req.body.nameReviwer,
        date: req.body.date,
        rate: req.body.rate,
        bookId: req.body.bookId
    })
    addComment.save(err => {
        if (err) {
            console.log(err)
            res.status(400).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.COMMENT.CREATE
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Comment created"
            });
        }
    })
}
function getCommentByIdBook(req, res)  {
    reviewComment.find({ bookId: req.params.bookId })
                .populate('nameReviwer')
                .exec((err, lst) => {
                    if (err) {
                        res.send({
                            success: false,
                            status: 400,
                            message: message.ERROR_MESSAGE.COMMENT.NOT_FOUND
                        });
                        return;
                    }
                    res.json(lst);
                });
}
function deleteComment(req, res) {
    reviewComment.findByIdAndDelete(req.params.id,
        (err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    status: 400,
                    message: message.ERROR_MESSAGE.COMMENT.DELETE
                })
            }else {
                res.send({
                    success: true,
                    status: 200,
                    message: message.SUCCESS_MESSAGE.COMMENT.DELETE
                })
            }
        });
}
/* #endregion */

/* #region Category route */
function createCategory (req, res) {
    console.log(req.body);
    let addCategory = new bookCategory({
        categoryName: req.body.categoryName,
    })
    addCategory.save(err => {
        if (err) {
            res.status(400).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.CATEGORY.CREATE
            });
            return;
        }
        res.status(200).send({
            success: true,
            message: "Category created"
        });
    })
}
function deleteCategory (req, res) {
    bookCategory.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send({
                success: true,
                status: 200,
                message: message.SUCCESS_MESSAGE.CATEGORY.DELETED
            })
        }
    });
}


function editCategory (req, res)  {
    bookCategory.findById(req.params.id, (err, update) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            update.categoryName = req.body.categoryName
            update.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        success: false,
                        status: 400,
                        message: message.ERROR_MESSAGE.CATEGORY.UPDATE
                    });
                } else {
                    console.log(result)
                    res.status(200).send({
                        success: true,
                        message: "Category updated"
                    });
                }
            });
        }
    });
}
/* #endregion */

/* #region  Author route */
function createAuthor (req, res) {
    var AddAuthor = new author({
        authorName: req.body.authorName,
        quote: req.body.quote,
        category: req.body.category,
        birthDay: req.body.birthDay,
        interviewContent: req.body.interviewContent,// image: 'https://appreviewbook-server.herokuapp.com/' + req.file.path
        image: req.body.file,
    })
    AddAuthor.save(err => {
        if (err) {
            res.status(400).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.AUTHOR.CREATE
            });
        } else {
            console.log("Created successfuly!!" + JSON.stringify(err, undefined, 2));
            res.status(200).send({
                success: true,
                message: "Author created"
            });
        }
    })
}

function editAuthor(req, res) {
    author.findById(req.params.id, (err, update) => {
        if (err) {
            res.status(500).send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.AUTHOR.NOT_FOUND
            })
        } else {
            update.authorName = req.body.authorName,
                update.quote = req.body.quote,
                update.category = req.body.category,
                update.releaseDate = req.body.releaseDate,
                update.interviewContent = req.body.interviewContent,
                update.birthDay = req.body.birthDay

            if (req.body.file == undefined) {
                console.log('No image');
            } else {
                update.image = req.body.file
            }

            update.save((err, result) => {
                if (err) {
                    res.status(400).send({
                        success: false,
                        status: 400,
                        message: message.ERROR_MESSAGE.AUTHOR.UPDATE
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Category updated"

                    });
                }
            });
        }
    });
}

//Get Author by Id
function getAuthorById(req, res) {
    author.findById(req.params.Id)
        .populate('category')
        .exec((err, result) => {
            if (err)
                res.send({
                    success: false,
                    status: 400,
                    message: message.ERROR_MESSAGE.AUTHOR.NOT_FOUND
                })
            else
                res.send(result);
        })
}

//Delete author

function deleteAuthor(req, res) {
    book.find({ author: req.params.id })
        .exec((err, result) => {
            if (err) {
                res.send({
                    success:false,
                    status: 400,
                    message: message.ERROR_MESSAGE.AUTHOR.NOT_FOUND
                })
            }
            if (result.length > 0) {
                res.send({ message: message.ERROR_MESSAGE.AUTHOR.HAVE_BOOK })
            } else {
                author.findByIdAndDelete(req.params.id,
                    (err, doc) => {
                        if (!err) {
                            res.send({
                                success: true,
                                status: 400,
                                message: message.ERROR_MESSAGE.AUTHOR.DELETE
                            })
                        }
                        res.send({
                            success: true,
                            status: 200,
                            message: message.SUCCESS_MESSAGE.AUTHOR.DELETED
                        })
                    })
            }
        })

}
/* #endregion */


function createChildComment (req, res) {
    let comment = new childComment({
        id_user: req.body.id_user,
        id_comment: req.body.id_comment,
        contentChild: req.body.contentChild,
        date: req.body.date
    })
    comment.save((err, result) =>{
        if(!err){
            res.send(result);
        }else{
            res.send({
                success: false,
                status: 400,
                message: message.ERROR_MESSAGE.COMMENT.CREATE
            });
        }
    })
}

function getChildCommentByIdComment (req, res) {
    childComment.find({ id_comment: req.params.id })
                .populate('id_user')
                .exec((err, lst) => {
                    if (err) {
                        res.send({
                            success: false,
                            status: 400,
                            message: message.ERROR_MESSAGE.COMMENT.NOT_FOUND
                        });
                        return;
                    }
                    res.json(lst);
                });
}
module.exports = router;