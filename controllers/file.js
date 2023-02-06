const express     = require('express');
const router      = express.Router();
const { Validator } = require('node-input-validator');
const HttpStatus = require('http-status-codes');
const fileUpload = require('express-fileupload');
const xlsHandler = require('xlsx');
const recordsHandler     = require('../models/records').records;

router.use(fileUpload());

let logger = console;

//let fileService = require('../services/fileService');
let isAuthenticated = require('../services/authenticationService').isAuthenticated;


router.get('/:entity_id',isAuthenticated,getRecordsByEntityId );
router.get('/', viewUploadFile );
router.post('/',isAuthenticated,uploadFile );


function viewUploadFile(req,res,next) {
    res.render('file');
}


function getRecordsByEntityId (req,res,next) {
    return new Promise((resolve,reject) => {
        recordsHandler.findAll({where: { entity_id: req.params.entity_id, status:1 }}).then(val => {
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
}


function uploadFile( req, res, next ) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    console.log(req.files);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.filetoupload;
    console.log(__dirname);

    uploadPath =  'files/' + sampleFile.name;
    
    entity_id = req.body.enitiyId
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).send(err);
        const file = xlsHandler.readFile(uploadPath);
        let data = []
        const sheets = file.SheetNames
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = xlsHandler.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                console.log(res);
                recordsHandler.create( {
                    entity_id : entity_id, 
                    col1 : res.COL1,
                    col2 : res.COL2,
                    col3 : res.COL3,
                    col4 : res.COL4,
                    created_at: new Date(),
                    updated_at: new Date(),
                    created_by:'kirit_bellubbi@abc.com',
                    updated_by:'kirit_bellubbi@abc.com',
                })
            })
        }

        res.status(HttpStatus.StatusCodes.CREATED);
                res.send({
                    errMessage: null,
                    error: false,
                    data : 'successfully uploaded'
                });
        });
    
}

module.exports = {
    router,
}