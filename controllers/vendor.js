let express     = require('express');
let router      = express.Router();
const { Validator } = require('node-input-validator');
var HttpStatus = require('http-status-codes');

let logger = console;

let vendorService = require('../services/vendorService');
let isAuthenticated = require('../services/authenticationService').isAuthenticated;

router.get('/:vendor_id',isAuthenticated, getVendor );
router.post('/', isAuthenticated,createVendor );


function getVendor( req, res, next ) {
    return new Promise((resolve,reject) => {
        console.log(req.params);
        vendorService.getVendor(req.params.vendor_id).then(val => {
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
    });
}

function createVendor (req, res, next) {
    
    return new Promise((resolve,reject) => {
        console.log(req.body);
        let rules =  {
            email:'required', 
            name:'required',
            address : 'required',
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

            vendorService.createVendor(req.body).then(val => {
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
                        errMessage: err.message,
                        error: true,
                        data : {}
                    });
            });

        });
    });
};

module.exports = {
    router,
}