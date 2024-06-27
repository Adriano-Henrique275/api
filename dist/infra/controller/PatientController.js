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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseService_1 = require("@/infra/DatabaseService");
const CreatePatient_1 = __importDefault(require("@/application/useCases/patient/CreatePatient"));
const CreateAppointment_1 = __importDefault(require("@/application/useCases/patient/CreateAppointment"));
const AuthenticatePatient_1 = __importDefault(require("@/application/useCases/patient/AuthenticatePatient"));
const GetPatientByPhone_1 = __importDefault(require("@/application/useCases/patient/GetPatientByPhone"));
class PatientControllerImpl {
    createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, password } = req.body;
            const useCase = new CreatePatient_1.default(DatabaseService_1.database);
            const patient = yield useCase.execute(name, phone, password);
            res.status(201).json(patient);
        });
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { agendaId } = req.body;
            const { patientId } = req.params;
            const useCase = new CreateAppointment_1.default(DatabaseService_1.database);
            const appointment = yield useCase.execute(Number(patientId), Number(agendaId));
            res.status(201).json(appointment);
        });
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, password } = req.body;
            const useCase = new AuthenticatePatient_1.default(DatabaseService_1.database);
            const patient = yield useCase.execute(phone, password);
            res.status(200).json(patient);
        });
    }
    getPatientByPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.params;
            const useCase = new GetPatientByPhone_1.default(DatabaseService_1.database);
            const patient = yield useCase.execute(phone);
            res.status(200).json(patient);
        });
    }
}
exports.default = PatientControllerImpl;
