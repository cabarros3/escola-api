import { Request, Response } from "express";
import { Curso } from "../models/index";

export const CursosController = {
  async criar(req: Request, res: Response) {
    try {
      const { curso_nome, curso_carga_horaria, curso_modalidade } = req.body;

      const novoCurso = await Curso.create({
        curso_nome,
        curso_carga_horaria,
        curso_modalidade,
      });

      return res.status(201).json(novoCurso);
    } catch (error: any) {
      return res.status(400).json({
        error: "Erro ao criar curso. Verifique os dados enviados.",
        details: error.message,
      });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const cursos = await Curso.findAll({
        attributes: [
          "curso_id",
          "curso_nome",
          "curso_carga_horaria",
          "curso_modalidade",
        ],
      });
      return res.json(cursos);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro interno ao buscar cursos" });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cursoId = await Curso.findByPk(id);

      if (!cursoId) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      return res.json(cursoId);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao buscar curso" });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { curso_nome, curso_carga_horaria, curso_modalidade } = req.body;

      const cursoId = await Curso.findByPk(id);

      if (!cursoId) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      await cursoId.update({
        curso_nome: curso_nome ?? cursoId.curso_nome,
        curso_carga_horaria: curso_carga_horaria ?? cursoId.curso_carga_horaria,
        curso_modalidade: curso_modalidade ?? cursoId.curso_modalidade,
      });

      return res.status(200).json({
        cursoId,
        mensagem: "Curso atualizado com sucesso",
      });
    } catch (error: any) {
      return res.status(400).json({
        error: "Erro ao atualizar curso. Verifique os valores enviados.",
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cursoId = await Curso.findByPk(id);

      if (!cursoId) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      await cursoId.destroy();

      return res.json({ mensagem: "Curso removido com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao deletar o curso" });
    }
  },
};
