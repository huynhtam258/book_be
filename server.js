require('./config/config');
require('./model/db');
require('./model/admin.model');
require('./config/passportConfig');
// Mấy cái quái quỷ phía trên này phải nằm trên cùng VÀ PHẢI THEO THỨ TỰ chứ ko là lỗi sml :(

const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
var app = express();
const http = require('http').Server(app);
const api = require('./routes/api');
const path = require('path');
app.use('/uploads', express.static('uploads'));

// --Parser
// app.use(bodyParser()); //deprecated
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --Cors
// app.use(cors({ origin: 'https://appreviewbook.herokuapp.com'}));
app.use(cors({ origin: 'http://localhost:4200'}));
// app.use(cors());

// --Passport
app.use(passport.initialize());

// --API
app.use('/book', api);
/* #endregion */

/* #region DB connect & run Server */
app.listen(process.env.PORT || 3000, () => console.log(`Listen on port ${process.env.PORT}`));

module.exports = mongoose;