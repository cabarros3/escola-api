import { Request, Response } from "express";
import { Aluno } from "../models";

export const AlunosController = {
  async criar(req: Request, res: Response) {
    try {
      const { aluno_nome, aluno_email, createdAt, updatedAt } = req.body;

      const novoAluno = await Aluno.create({
        aluno_nome,
        aluno_email,
        createdAt,
        updatedAt,
      });

      return res.status(201).json(novoAluno);
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Este e-mail já está cadastrado." });
      }

      return res.status(400).json({
        error: "Erro ao criar aluno",
        details: error.message,
      });
    }
  },

  async listar(req: Request, res: Response) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ["aluno_id", "aluno_nome", "aluno_email", "createdAt"],
      });
      return res.json(alunos);
    } catch (erro: any) {
      console.error("ERRO NO BANCO:", erro); // <-- Adicione isso para ver o log no terminal
      return res.status(500).json({ error: erro.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }
      return res.json(aluno);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "ID fornecido é inválido ou erro no servidor" });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { aluno_nome, aluno_email } = req.body;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res
          .status(404)
          .json({ error: "Aluno não encontrado para atualização" });
      }

      await aluno.update({
        aluno_nome: aluno_nome || aluno.aluno_nome,
        aluno_email: aluno_email || aluno.aluno_email,
      });

      return res.status(200).json({
        aluno,
        mensagem: "Aluno atualizado com sucesso",
      });
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "O novo e-mail já está em uso por outro aluno." });
      }
      return res.status(500).json({ error: "Erro ao atualizar o aluno" });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      await aluno.destroy();

      return res.json({ mensagem: "Aluno removido com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao deletar o aluno" });
    }
  },
};
