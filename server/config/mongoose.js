var mongoose = require('mongoose'),
    userModel = require('../models/users');
//reqModel = require('../models/Req');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('mspvms db opened');
    });

    userModel.createDefaultUsers();

    //reqModel.createDefaultReqs();
};
