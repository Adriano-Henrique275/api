import DatabaseService from "@/infra/DatabaseService";
import {
  comparePassaword,
  encodeToBase64,
} from "@/infra/helpers/SecurityHelper";

export default class AuthenticatePatientUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(phone: string, password: string) {
    // Verifica se o paciente existe com o telefone passado
    const user = await this.database.getUserByPhone(phone);

    if (!user) {
      throw new Error("Patient not found");
    }

    // Verifica se a senha passada é igual a senha do paciente
    const isPasswordValid = comparePassaword(password, "klvhaklsdjbvaklsjhb");

    if (!isPasswordValid) {
      throw new Error("Phone or Password is invalid.");
    }

    // Retorna um token de autenticação
    const payload = {
      user: {
        id: user.id,
        phone: user.phone,
      },
    };

    // Converte o payload oara base64
    return encodeToBase64(JSON.stringify(payload));
  }
}
