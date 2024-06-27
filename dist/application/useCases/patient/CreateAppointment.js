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
class CreateAppointmentUseCase {
    constructor(database) {
        this.database = database;
    }
    execute(patientId, agendaId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o paciente existe com o id passado
            const patient = yield this.database.getPatientById(patientId);
            if (!patient) {
                throw new Error("Patient not found");
            }
            // Verificar se a agenda existe com o id passado e está disponivél
            const agenda = yield this.database.getAgendaById(agendaId);
            if (!(agenda === null || agenda === void 0 ? void 0 : agenda.available)) {
                throw new Error("Agenda not available for this date");
            }
            // Atualizar a agenda para não estar mais disponivél
            yield this.database.updateAgenda(agenda.id, { available: false });
            // Criar um novo agendamento para o paciénte com o id passado e a agenda com o id passado
            const appointment = yield this.database.createAppointment(patient.id, agenda.doctorId, agenda.date);
            // Retorna o agendamento criado
            return appointment;
        });
    }
}
exports.default = CreateAppointmentUseCase;
