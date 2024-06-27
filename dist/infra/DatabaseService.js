"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const client_1 = require("@prisma/client");
class DatabaseService {
    constructor(connection) {
        this.connection = connection;
    }
    listDoctor() {
        return this.connection.doctor.findMany();
    }
    getDoctorById(id, includeAgenda = false) {
        return this.connection.doctor.findUnique({
            where: { id },
            include: {
                agenda: includeAgenda,
            },
        });
    }
    getPatientByPhone(phone, includeAppointment = false, includeDoctor = false) {
        return this.connection.patient.findUnique({
            where: { phone },
            include: {
                appointment: !includeAppointment
                    ? false
                    : { include: { doctor: includeDoctor } },
            },
        });
    }
    getUserByPhone(phone, includeAppointment = false, includeDoctor = false) {
        return this.connection.patient.findUnique({
            where: { phone },
            include: {
                appointment: !includeAppointment
                    ? false
                    : { include: { doctor: includeDoctor } },
            },
        });
    }
    createUser(phone, password) {
        return this.connection.user.create({
            data: {
                phone,
                password,
            },
        });
    }
    // getUserByPhone(phone: string) {}
    createPatient(name, phone, userId) {
        return this.connection.patient.create({
            data: {
                name,
                phone,
                userId,
            },
        });
    }
    getPatientById(id) {
        return this.connection.patient.findUnique({
            where: { id },
        });
    }
    getAgendaById(id) {
        return this.connection.agenda.findUnique({
            where: { id },
        });
    }
    createAppointment(patientId, doctorId, date) {
        return this.connection.appointment.create({
            data: {
                patientId,
                doctorId,
                date,
            },
        });
    }
    updateAgenda(id, data) {
        return this.connection.agenda.update({
            where: { id },
            data,
        });
    }
}
exports.default = DatabaseService;
exports.database = new DatabaseService(new client_1.PrismaClient());
