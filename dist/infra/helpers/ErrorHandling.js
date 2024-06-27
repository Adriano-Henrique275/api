"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
exports.responseErrorFormatter = responseErrorFormatter;
const Errors_1 = require("./Errors");
const HttpStatusCode_1 = require("./HttpStatusCode");
const errorHandling = (error, req, res, next) => {
    let statusCode = HttpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
    if (error instanceof Errors_1.NotFoundError)
        statusCode = HttpStatusCode_1.HttpStatusCode.NOT_FOUND;
    if (error instanceof Errors_1.UnauthorizedError)
        statusCode = HttpStatusCode_1.HttpStatusCode.UNAUTHORIZED;
    if (error instanceof Errors_1.BussinesError)
        statusCode = HttpStatusCode_1.HttpStatusCode.UNPROCESSABLE_ENTITY;
    return res.status(statusCode).json(responseErrorFormatter(error));
};
exports.errorHandling = errorHandling;
function responseErrorFormatter(error) {
    return {
        name: error.name,
        message: error.message,
    };
}
