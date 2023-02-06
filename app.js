'use strict'
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const app = express();
const router = express.Router();

let userRoute = require('./controllers/users').router;
let vendorRoute = require('./controllers/vendor').router;
let entityRoute = require('./controllers/entity').router;
let fileUpload = require('./controllers/file').router;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("css", path.join(__dirname, "views"));



router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index')
})

router.use('/users', userRoute);
router.use('/vendors', vendorRoute);
router.use('/entity', entityRoute);
router.use('/file', fileUpload);


router.get('/advik', (req, res) => {
  res.sendFile(`${__dirname}/advik.jpg`);
})



// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router);
//app.use(RequestRateLimitMiddleware);

module.exports = app;
