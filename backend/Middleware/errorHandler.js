const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title: "VALIDATION FAILED", message: err.message, status:statusCode, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title: "NOT FOUND", message: err.message, status:statusCode, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title: "FORBIDDEN", message: err.message, status:statusCode, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, status:statusCode, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title: "SERVER ERROR", message: err.message, status:statusCode, stackTrace: err.stack});
            break;
        default:
            console.log('NO ERROR, WORKING FINE !');
            break;
    };
};

module.exports = errorHandler;