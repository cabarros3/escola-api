import { Model, Sequelize, DataTypes } from "sequelize";

interface IMatricula {
  aluno_id: string;
  curso_id: string;
  matricula_created_at: Date;
  matricula_updated_at: Date;
}

class Matriculas extends Model {
  public aluno_id!: string;
  public curso_id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function MatriculaModel(sequelize: Sequelize) {
  Matriculas.init(
    {
      aluno_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "ALUNOS",
          key: "aluno_id",
        },
      },
      curso_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "CURSOS",
          key: "curso_id",
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "MATRICULAS",
      createdAt: "MATRICULA_CREATED_AT",
      updatedAt: "MATRICULA_UPDATED_AT",
      deletedAt: "MATRICULA_DELETED_AT",
    }
  );

  return Matriculas;
}
