"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateParams = validateParams;
exports.isAuthenticated = isAuthenticated;
const Errors_1 = require("./helpers/Errors");
const HttpStatusCode_1 = require("./helpers/HttpStatusCode");
const ErrorHandling_1 = require("./helpers/ErrorHandling");
const SecurityHelper_1 = require("./helpers/SecurityHelper");
// validar a requisição
function validatePayload(schema, key) {
    return (req, res, next) => {
        const { error } = schema.validate(req[key]);
        if (error) {
            const message = "Invalid payload";
            return res
                .status(HttpStatusCode_1.HttpStatusCode.BAD_REQUEST)
                .json({ message, error: error.message });
        }
        next();
    };
}
// validar o body da requisição
function validateBody(schema) {
    return validatePayload(schema, "body");
}
// validar os parâmetros da requisição
function validateParams(schema) {
    return validatePayload(schema, "params");
}
// validar se o token de autenticação foi enviado
function isAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        const message = new Errors_1.BadRequestError("Missing authorization header");
        return res
            .status(HttpStatusCode_1.HttpStatusCode.UNAUTHORIZED)
            .json((0, ErrorHandling_1.responseErrorFormatter)(message));
    }
    const token = req.headers.authorization.split(" ")[1];
    const user = (0, SecurityHelper_1.decodeFromBase64)(token);
    if (!user) {
        const message = new Errors_1.BadRequestError("Invalid token");
        return res
            .status(HttpStatusCode_1.HttpStatusCode.UNAUTHORIZED)
            .json((0, ErrorHandling_1.responseErrorFormatter)(message));
    }
    next();
}
