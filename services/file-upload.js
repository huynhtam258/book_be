var aws = require('aws-sdk')
// var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
aws.config.update({
    secretAccessKey: 'ZfhVFDrA2qIu5s+CX3KrVMIlAEhvlo4k9pZZX1zp',
    accessKeyId: 'AKIAZH2TWT5KBXHXSKYY',
    region: 'us-west-2'
});
// var app = express()
var s3 = new aws.S3()
 
var uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'appreviewbook',
    acl: 'public-read', // Cho phép download
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
        // cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = uploads3;