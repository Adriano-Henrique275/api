"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassaword = comparePassaword;
exports.encodeToBase64 = encodeToBase64;
exports.decodeFromBase64 = decodeFromBase64;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(password) {
    const SALT = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(password, SALT);
}
function comparePassaword(password, hash) {
    return bcrypt_1.default.compareSync(password, hash);
}
function encodeToBase64(data) {
    return Buffer.from(data).toString("base64");
}
function decodeFromBase64(data) {
    return Buffer.from(data, "base64").toString("utf-8");
}
