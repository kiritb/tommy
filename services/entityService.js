const {vendors: vendor} = require("../models/vendor");
const entity = require('../models/entities').entities;

let logger = console;

let allEntities = () => {
    return entity.findAll();
}

let createEntity = (entityObj) => {
    return new Promise((resolve, reject) => {
        entity.create({
            vendor_id: entityObj.vendor_id,
            name: entityObj.name,
            code: entityObj.code,
            type: entityObj.type,
            status: 1,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: entityObj.loggedInEmail,
            updated_by: entityObj.loggedInEmail
        }).then((values) => {
            resolve(values);
        }).catch(err => {
            reject(err);
        })
    });
};

let getEntity = (entityId) => {
    let entityData = entity.findOne({where: {id: entityId}}).then((values) => {
        resolve(entityData);
    }).catch(err => {
        reject(err);
    })
}

module.exports = {
    createEntity,
    getEntity,
    allEntities
}
