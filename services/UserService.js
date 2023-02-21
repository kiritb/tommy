let users = require('../models/users').users;
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let logger = console;

let registerUser = (userObj) => {
    return new Promise((resolve, reject) => {
        return users.create({
            email: userObj.email,
            password: bcrypt.hashSync(userObj.password, 10),
            name: userObj.name,
            status: 1,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: userObj.email,
            updated_by: userObj.email
        }).then((values) => {
            resolve(values);
        }).catch(err => {
            reject(err);
        })
    });
};

let loginUser = (userObj) => {
    return new Promise((resolve, reject) => {
        users.findAll({where: {email: userObj.email, status: 1}}).then((values) => {
            if (!values.length) {
                reject('invalid credentials');
            }

            values.forEach((l) => {
                let userDetails = l.get({plain: true})
                if (values && bcrypt.compareSync(userObj.password, userDetails.password)) {
                    let userId = userDetails.id
                    token = jwt.sign(userId, process.env.JWT_SECRET_KEY);
                    delete userDetails.password;
                    userDetails['token'] = token
                    console.log(userDetails);
                    resolve(userDetails);
                } else {
                    reject("Invalid credentials");
                }
            });
        }).catch(err => {
            reject(err);
        })
    });
};

let getUserProfile = (userId) => {

    let userDetails = users.findAll({where: {id: userId, status: 1}});
    if (userDetails) {
        return userDetails;
    } else {
        return []
    }

}

let resetPassword = (userObj) => {
    return new Promise((resolve, reject) => {
        users.findAll({where: {id: userObj.userId, status: 1}, raw: 1}).then((values) => {
            if (values.length > 0) {
                if (values && bcrypt.compareSync(userObj.password, values[0].password)) {
                    let updateObj = {};

                    if (userObj.newPassword) {
                        updateObj.password = bcrypt.hashSync(userObj.newPassword, 10);
                    }

                    if (userObj.name) {
                        updateObj.name = userObj.name
                    }

                    updateObj.updated_at = new Date();
                    updateObj.updated_by = values[0].email;

                    users.update(updateObj, {where: {id: userObj.userId}}).then((update) => {
                        delete updateObj.password;
                        resolve(updateObj);
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    reject('In correct current Password ');
                }
            } else {
                reject('No records found');
            }
        });
    });
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    resetPassword,
}
