import { Router } from "express";
import { AlunosController } from "../controllers/AlunosController";

const routerAlunos = Router();

// Rotas de Alunos
routerAlunos.post("/", AlunosController.criar);
routerAlunos.get("/", AlunosController.listar);
routerAlunos.get("/:id", AlunosController.buscarPorId);
routerAlunos.put("/:id", AlunosController.atualizar);
routerAlunos.delete("/:id", AlunosController.deletar);

export default routerAlunos;
