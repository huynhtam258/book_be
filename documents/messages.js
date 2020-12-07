module.exports = {
    ERROR_MESSAGE: {
        USER: {
            EXIST: 'USER_EXIST',
            NOT_FOUND: 'USER_NOT_FOUND',
            INVALD: 'USER_INVALID',
            UPDATE: 'USER_UPDATE_FAIL'
            
        },
        BOOK: {
            EXIST: 'BOOK_EXIST',
            NOT_FOUND: 'BOOK_NOT_FOUND',
            INVALD: 'BOOK_INVALID',
            UPDATE: 'BOOK_UPDATE_FAIL',
            CREATE: 'BOOK_CREATE_FAIL',
            DELETE: 'BOOK_DELETE_FAIL'
        },
        AUTHOR: {
            EXIST: 'AUTHOR_EXIST',
            NOT_FOUND: 'AUTHOR_NOT_FOUND',
            INVALD: 'AUTHOR_INVALID',
            CREATE: 'AUTHOR_CREATE_FAIL',
            UPDATE: 'AUTHOR_UPDATE_FAIL',
            DELETE: 'AUTHOR_DELETE_FAIL'
        },
        CATEGORY: {
            EXIST: 'CATEGORY_EXIST',
            NOT_FOUND: 'CATEGORY_NOT_FOUND',
            INVALD: 'CATEGORY_INVALID',
            UPDATE: 'CATEGORY_UPDATE_FAIL',
            CREATE: 'CATEGORY_CREATE_FAIL'
        },
        COMMENT:{
            CREATE: 'COMMENT_FAIL',
            NOT_FOUND: 'COMMENT_NOT_FOUND',
            DELETE: 'COMMENT_DELETE_FAIL'
        },
        AUTH: {
            INVALID_TOKEN: 'INVALID_TOKEN',
            PERMISSION: 'PERMISSION',
            NOT_AUTHORIZED: 'NOT_AUTHORIZED'
        }
    },
    SUCCESS_MESSAGE: {
        USER: {
            CREATED: 'USER_CREATED',
            DELETED: 'USER_DELETED'
        },
        BOOK: {
            CREATED: 'BOOK_CREATED',
            DELETED: 'BOOK_DELETED'
        },
        CATEGORY: {
            CREATED: 'CATEGORY_CREATED',
            DELETED: 'CATEGORY_DELETED'
        },
        AUTHOR: {
            CREATED: 'AUTHOR_CREATED',
            DELETED: 'AUTHOR_DELETED'
        },
        COMMENT: {
            CREATED: 'COMMENT_CREATED',
            DELETED: 'COMMENT_DELETED'
        }
    }
};
