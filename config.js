const config = {
    app: {
        port: 3000
    },
    mongo : {
        URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tommy',
    }
};

module.exports = {
    config:config
};