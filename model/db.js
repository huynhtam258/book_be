const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if(!err) {
        console.log('Connected!');
    }
    else {
        console.log('Error when connect to DB: ' + JSON.stringify(err, undefined, 2));
    }
});