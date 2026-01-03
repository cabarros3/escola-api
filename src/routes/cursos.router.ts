import { Router } from "express";
import { CursosController } from "../controllers/CursosController";

const cursosRoutes = Router();

// Rotas de Cursos
cursosRoutes.post("/", CursosController.criar);
cursosRoutes.get("/", CursosController.listar);
cursosRoutes.get("/:id", CursosController.buscarPorId);
cursosRoutes.put("/:id", CursosController.atualizar);
cursosRoutes.delete("/:id", CursosController.deletar);

export default cursosRoutes;
