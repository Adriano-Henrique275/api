import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  constructor(readonly connection: PrismaClient) {}

  listDoctor() {
    return this.connection.doctor.findMany();
  }

  getDoctorById(id: number, includeAgenda: boolean = false) {
    return this.connection.doctor.findUnique({
      where: { id },
      include: {
        agenda: includeAgenda,
      },
    });
  }

  getPatientByPhone(
    phone: string,
    includeAppointment: boolean = false,
    includeDoctor: boolean = false
  ) {
    return this.connection.patient.findUnique({
      where: { phone },
      include: {
        appointment: !includeAppointment
          ? false
          : { include: { doctor: includeDoctor } },
      },
    });
  }

  createUser(phone: string, password: string) {
    return this.connection.user.create({
      data: {
        phone,
        password,
      },
    });
  }

  // getUserByPhone(phone: string) {}

  createPatient(name: string, phone: string, userId: number) {
    return this.connection.patient.create({
      data: {
        name,
        phone,
        userId,
      },
    });
  }

  getPatientById(id: number) {
    return this.connection.patient.findUnique({
      where: { id },
    });
  }

  getAgendaById(id: number) {
    return this.connection.agenda.findUnique({
      where: { id },
    });
  }

  createAppointment(patientId: number, doctorId: number, date: Date) {
    return this.connection.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
      },
    });
  }

  updateAgenda(id: number, data: { available: boolean }) {
    return this.connection.agenda.update({
      where: { id },
      data,
    });
  }
}

export const database = new DatabaseService(new PrismaClient());
