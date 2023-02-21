let express     = require('express');
let router      = express.Router();
const { Validator } = require('node-input-validator');
var HttpStatus = require('http-status-codes');

let logger = console;

let entityService = require('../services/entityService');
const vendorService = require("../services/vendorService");
let isAuthenticated = require('../services/authenticationService').isAuthenticated;

router.get('/:entity_id',isAuthenticated, getEntity );
router.post('/', isAuthenticated,createEntity );
router.get('/', isAuthenticated,allEntities );

function allEntities(req, res, next) {
    return new Promise((resolve, reject) => {
        entityService.allEntities().then(data => {
            res.status(HttpStatus.StatusCodes.OK);
            res.send({
                errMessage: null,
                error: false,
                data : data
            });
        }).catch(err => {
            console.log(err);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
            res.send({
                errMessage: null,
                error: true,
                data : err
            });
        })
    })
}


function getEntity( req, res, next ) {
    return new Promise((resolve,reject) => {
        console.log(req.params);
        entityService.getEntity(req.params.entity_id).then(val => {
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

function createEntity (req, res, next) {

    return new Promise((resolve,reject) => {
        console.log(req.body);
        let rules =  {
            code:'required',
            name:'required',
            type : 'required',
            vendor_id : 'required',
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

            entityService.createEntity(req.body).then(val => {
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
