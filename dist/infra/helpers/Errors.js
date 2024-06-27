"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = exports.UnauthorizedError = exports.BussinesError = exports.BadRequestError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
class BussinesError extends Error {
    constructor(message) {
        super(message);
        this.name = "BussinesError";
    }
}
exports.BussinesError = BussinesError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnprocessableEntityError";
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
