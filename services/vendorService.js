const vendor           = require('../models/vendor').vendors;

let logger = console;

let createVendor = (vendorObj) => {
    return new Promise((resolve, reject) => {
        vendor.create( {
            email : vendorObj.email, 
            name:vendorObj.name,
            address : vendorObj.address,
            status : 1,
            created_at: new Date(),
            updated_at: new Date(),
            created_by:vendorObj.loggedInEmail,
            updated_by:vendorObj.loggedInEmail
        } ).then((values) => {
            resolve(values);
        }).catch(err => {
            reject(err);
        })
    }); 
};

let getVendor = (vendorId) => {    
    let vendorData = vendor.findOne({ where: { id: vendorId } });
    if(vendorData) {
        return vendorData;
    }else{
        return []
    } 
}

module.exports = {
    createVendor,
    getVendor
}