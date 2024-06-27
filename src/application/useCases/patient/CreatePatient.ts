import DatabaseService from "@/infra/DatabaseService";
import { hashPassword } from "@/infra/helpers/SecurityHelper";

export default class CreatePatientUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(name: string, phone: string, password: string) {
    // Verificar se o paciente já existe com esse telefone
    const patient = await this.database.getPatientByPhone(phone);

    if (patient) {
      throw new Error("Patient already exists with this phone number");
    }

    // Gera um hash seguro para a senha ser armazenada no banco de dados
    const hashedPassword = hashPassword(password);

    // Adicionar um novo usuário com este telefone
    const user = await this.database.createUser(phone, hashedPassword);

    // Adicionar o paciente com o nome, telefone e id de ususário criado
    const newPatient = await this.database.createPatient(name, phone, user.id);

    // retorna o paciente criado
    return newPatient;
  }
}
