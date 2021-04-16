const bodyParser = require('body-parser');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');

        // authorized headers for preflight requests
        // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();

        app.options('*', (req, res) => {
            // allowed XHR methods
            res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
            res.send();
        });
    });
};

