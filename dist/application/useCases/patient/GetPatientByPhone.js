"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@/infra/helpers/Errors");
class GetPatientByPhoneUseCase {
    constructor(database) {
        this.database = database;
    }
    execute(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            // lógica de negócio
            const INCLUDE_APPOINTMENT = true;
            const INCLUDE_DOCTOR = true;
            const patient = yield this.database.getPatientByPhone(phone, INCLUDE_APPOINTMENT, INCLUDE_DOCTOR);
            if (!patient) {
                throw new Errors_1.NotFoundError("No patient found");
            }
            return patient;
        });
    }
}
exports.default = GetPatientByPhoneUseCase;
