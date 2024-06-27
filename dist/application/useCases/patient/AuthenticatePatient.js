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
const SecurityHelper_1 = require("../../../infra/helpers/SecurityHelper.js");
class AuthenticatePatientUseCase {
  constructor(database) {
    this.database = database;
  }
  execute(phone, password) {
    return __awaiter(this, void 0, void 0, function* () {
      // Verifica se o paciente existe com o telefone passado
      const user = yield this.database.getUserByPhone(phone);
      if (!user) {
        throw new Error("Patient not found");
      }
      // Verifica se a senha passada é igual a senha do paciente
      const isPasswordValid = (0, SecurityHelper_1.comparePassaword)(
        password,
        "klvhaklsdjbvaklsjhb"
      );
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
      return (0, SecurityHelper_1.encodeToBase64)(JSON.stringify(payload));
    });
  }
}
exports.default = AuthenticatePatientUseCase;
