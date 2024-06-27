import DatabaseService from "@/infra/DatabaseService";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(patientId: number, agendaId: number) {
    // Verificar se o paciente existe com o id passado

    const patient = await this.database.getPatientById(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Verificar se a agenda existe com o id passado e está disponivél
    const agenda = await this.database.getAgendaById(agendaId);

    if (!agenda?.available) {
      throw new Error("Agenda not available for this date");
    }

    // Atualizar a agenda para não estar mais disponivél
    await this.database.updateAgenda(agenda.id, { available: false });

    // Criar um novo agendamento para o paciénte com o id passado e a agenda com o id passado
    const appointment = await this.database.createAppointment(
      patient.id,
      agenda.doctorId,
      agenda.date
    );

    // Retorna o agendamento criado
    return appointment;
  }
}
