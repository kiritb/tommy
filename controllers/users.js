let express     = require('express');
let router      = express.Router();
const { Validator } = require('node-input-validator');
var HttpStatus = require('http-status-codes');

let logger = console;

let UserService = require('../services/UserService');
let isAuthenticated = require('../services/authenticationService').isAuthenticated;

router.post('/login', loginUser );
router.post('/', registerUser);
router.get('/:user_id', getUserProfile);
router.get('/view',userView);
router.post('/password/reset/:user_id', resetPassword);


function userView() {
    res.render('user');
}

function loginUser( req, res, next ) {
    return new Promise((resolve,reject) => {
        console.log('point 1 in login function');
        
        let rules =  {
            email:'required', 
            password:'required',
         };
         
        let validation = new Validator(req.body, rules);
        
        validation.check().then(function (matched) {
            if( ! matched){
                return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
                    errMessage: validation.errors,
                    error: true,
                    data : {}
                });
            }

            UserService.loginUser(req.body).then(val => {
                res.status(HttpStatus.StatusCodes.OK);
                res.send({
                    errMessage: null,
                    error: false,
                    data : val
                });
                
            }).catch(err => {
                logger.error(err);
                res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
                    res.send({
                        errMessage: err,
                        error: true,
                        data : {}
                    });
            });

        });
    });
}

function registerUser (req, res, next) {
    
    return new Promise((resolve,reject) => {
        console.log(req.body);
        let rules =  {
            email:'required', 
            password:'required',
         };
         
        let validation = new Validator(req.body, rules);
        
        validation.check().then(function (matched) {
            if( ! matched){
                return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
                    errMessage: validation.errors,
                    error: true,
                    data : {}
                });
            }

            UserService.registerUser(req.body).then(val => {
                res.status(HttpStatus.StatusCodes.CREATED);
                res.send({
                    errMessage: null,
                    error: false,
                    data : val
                });
                
            }).catch(err => {
                logger.error(err);
                res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
                    res.send({
                        errMessage: err,
                        error: true,
                        data : {}
                    });
            });

        });
    });
};

function resetPassword (req, res, next) {
    
    return new Promise((resolve,reject) => {
        
        let rules =  {
            password:'required',
            newPassword:'required',
         };
         
        let validation = new Validator(req.body, rules);
        
        validation.check().then(function (matched) {
            if( ! matched){
                return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
                    errMessage: validation.errors,
                    error: true,
                    data : {}
                });
            }

            req.body.userId = req.params.user_id;
            
            UserService.resetPassword(req.body).then(val => {
                res.status(HttpStatus.StatusCodes.OK);
                res.send({
                    errMessage: null,
                    error: false,
                    data : val
                });
                
            }).catch(err => {
                logger.error(err);
                res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
                    res.send({
                        errMessage: err,
                        error: true,
                        data : {}
                    });
            });

        });
    });
};

function getUserProfile (req, res, next) {

    UserService.getUserProfile(req.params.user_id).then(val => {
        if(val)
        {
            res.status(HttpStatus.StatusCodes.OK);
            res.send({
                errMessage: null,
                error: false,
                data : val
            });     
        }
        else
        {
            res.status(HttpStatus.StatusCodes.NOT_FOUND);
            res.send({
                errMessage: 'no records found',
                error: false,
                data : {}
            });   
        }
    }).catch(err => {
        logger.error(err);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
            res.send({
                errMessage: err,
                error: true,
                data : {}
            });
    });
};


module.exports = {
    router,
}