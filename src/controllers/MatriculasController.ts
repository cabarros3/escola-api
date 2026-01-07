import { Request, Response } from "express";
import { Matricula, Aluno, Curso } from "../models";

export const MatriculasController = {
  async matricular(req: Request, res: Response) {
    try {
      const { aluno_id, curso_id } = req.body;

      const aluno = await Aluno.findByPk(aluno_id);
      const curso = await Curso.findByPk(curso_id);

      if (!aluno || !curso) {
        return res
          .status(404)
          .json({ error: "Aluno ou Curso não encontrado." });
      }

      const novaMatricula = await Matricula.create({
        aluno_id,
        curso_id,
      });

      return res.status(201).json(novaMatricula);
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Este aluno já está matriculado neste curso." });
      }
      return res
        .status(400)
        .json({ error: "Erro ao realizar matrícula", details: error.message });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const matriculas = await Matricula.findAll({
        include: [
          { model: Aluno, attributes: ["aluno_nome"] },
          { model: Curso, attributes: ["curso_nome"] },
        ],
      });
      return res.json(matriculas);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao listar matrículas" });
    }
  },

  async cancelarMatricula(req: Request, res: Response) {
    try {
      const { aluno_id, curso_id } = req.params;

      const matricula = await Matricula.findOne({
        where: { aluno_id, curso_id },
      });

      if (!matricula) {
        return res.status(404).json({ error: "Matrícula não encontrada" });
      }

      await matricula.destroy();

      return res.json({ mensagem: "Matrícula cancelada com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao cancelar matrícula" });
    }
  },
};
