const express = require('express');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

let userService = require('../services/UserService');

let ValidateToken = (token) => {
    return new Promise((resolve, reject) => {

        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
            console.log("Not a valid JWT token");
            reject("Not a valid JWT token");
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, payload) {
            if (err) {
                console.log("Invalid Token.");
                reject(err.message);
            }

            new Promise(() => {
                userService.getUserProfile(payload).then(userDetails => {
                    responseObj = { loggedInId : payload, loggedInEmail :userDetails[0].email};
                    resolve(responseObj);
            }).catch(err => {
                    res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
                        error: true,
                        data: err
                    });
                })
            });
        });
    });
}

module.exports.isAuthenticated = (req, res, next) => {
    new Promise(() => {
        ValidateToken(req.headers['x-api-key']).then(val=> {
            req.body.loggedInId = val.loggedInId;
            req.body.loggedInEmail = val.loggedInEmail;
            next();
        }).catch(err => {
            res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
                error: true,
                data: err
            });
        });
    })
};