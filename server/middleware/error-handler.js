const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../error/custom-error');

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res
            .status(err.statusCode)
            .json({message: err.message});
    }

    return res  
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .message('Somthing went wrong, try again!');
}

module.exports = errorHandler;