"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ValidationMiddleware_1 = require("../infra/ValidationMiddleware");
const ValidationSchemas_1 = require("../infra/ValidationSchemas");
const ErrorHandling_1 = require("./helpers/ErrorHandling");
class Router {
  constructor(doctorController, patientController) {
    this.doctorController = doctorController;
    this.patientController = patientController;
    this.app = (0, express_1.default)();
    this.app.use((0, cors_1.default)());
    this.app.use((0, helmet_1.default)());
    this.app.use(express_1.default.json());
    this.setRoutes();
    this.app.use(ErrorHandling_1.errorHandling);
  }
  setRoutes() {
    // rotas da aplicação
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
    this.app.post(
      "/authenticate",
      (0, ValidationMiddleware_1.validateBody)(
        ValidationSchemas_1.authenticationSchema
      ),
      this.patientController.authenticate
    );
    this.app.get("/doctors", this.doctorController.listDoctor);
    this.app.get(
      "/doctor/:id",
      (0, ValidationMiddleware_1.validateParams)(
        ValidationSchemas_1.getDoctorByIdSchema
      ),
      this.doctorController.getDoctorById
    );
    this.app.post("/patient", this.patientController.createPatient);
    this.app.get(
      "/patient/:phone",
      ValidationMiddleware_1.isAuthenticated,
      (0, ValidationMiddleware_1.validateParams)(
        ValidationSchemas_1.getPatientByPhoneSchema
      ),
      this.patientController.getPatientByPhone
    );
    this.app.post(
      "/patient/:patientId/appointment",
      ValidationMiddleware_1.isAuthenticated,
      (0, ValidationMiddleware_1.validateParams)(
        ValidationSchemas_1.createPatientPatientIdSchema
      ),
      (0, ValidationMiddleware_1.validateBody)(
        ValidationSchemas_1.createAppointmentAgendaIdSchema
      ),
      this.patientController.createAppointment
    );
  }
  start(port) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
exports.default = Router;
