import { Router } from "express";
import { MatriculasController } from "../controllers/MatriculasController";

const routerMatriculas = Router();

// Rotas de Alunos
routerMatriculas.post("/", MatriculasController.matricular);
routerMatriculas.get("/", MatriculasController.listar);
routerMatriculas.get("/:id", MatriculasController.cancelarMatricula);

export default routerMatriculas;
