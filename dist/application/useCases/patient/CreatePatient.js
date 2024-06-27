"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityHelper_1 = require("../../../infra/helpers/SecurityHelper");
class CreatePatientUseCase {
  constructor(database) {
    this.database = database;
  }
  execute(name, phone, password) {
    return __awaiter(this, void 0, void 0, function* () {
      // Verificar se o paciente já existe com esse telefone
      const patient = yield this.database.getPatientByPhone(phone);
      if (patient) {
        throw new Error("Patient already exists with this phone number");
      }
      // Gera um hash seguro para a senha ser armazenada no banco de dados
      const hashedPassword = (0, SecurityHelper_1.hashPassword)(password);
      // Adicionar um novo usuário com este telefone
      const user = yield this.database.createUser(phone, hashedPassword);
      // Adicionar o paciente com o nome, telefone e id de ususário criado
      const newPatient = yield this.database.createPatient(
        name,
        phone,
        user.id
      );
      // retorna o paciente criado
      return newPatient;
    });
  }
}
exports.default = CreatePatientUseCase;
