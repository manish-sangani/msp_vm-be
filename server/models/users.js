var mongoose = require('mongoose'),
    encrypt = require('./../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!'},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});


userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

var users = mongoose.model('users', userSchema);

function createDefaultUsers() {
    users.find({}).exec(function (err, collection) {
        if (collection.length == 0) {

            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            users.create({
                firstName: 'John',
                lastName: 'Papa',
                username: 'john@john.com',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            users.create({
                firstName: 'Joe',
                lastName: 'Eames',
                username: 'joe@joe.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            }, function (err, user) {
                if (err) {
                    console.log(err);
                }
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'dan');
            users.create({
                firstName: 'Dan',
                lastName: 'Wahlim',
                username: 'dan@dan.com',
                salt: salt,
                hashed_pwd: hash
            });
        }

    });
}
exports.createDefaultUsers = createDefaultUsers;