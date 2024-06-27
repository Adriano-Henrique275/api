"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("@/infra/Router"));
const DoctorController_1 = __importDefault(require("@/infra/controller/DoctorController"));
const PatientController_1 = __importDefault(require("@/infra/controller/PatientController"));
const doctorController = new DoctorController_1.default();
const patientController = new PatientController_1.default();
const app = new Router_1.default(doctorController, patientController);
exports.default = app;
