var env = process.env.NODE_ENV || 'development';

var config = require('./config.json');

var envConfig = config[env];

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);

// module.exports = {
//     "database":"mongodb://thanghuynh:leeminho*101#@ds125381.mlab.com:25381/bookver1",
//     "port":process.env.port || 3000,
//     "JWT_SECRET": "tlvf123",
//     "JWT_EXP": "2m",
// }