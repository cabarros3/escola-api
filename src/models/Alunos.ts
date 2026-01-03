import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface IAlunos {
  aluno_id: string;
  aluno_nome: string;
  aluno_email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AlunosCreationAttributes extends Optional<IAlunos, "aluno_id"> {}

class Alunos
  extends Model<IAlunos, AlunosCreationAttributes>
  implements IAlunos
{
  public aluno_id!: string;
  public aluno_nome!: string;
  public aluno_email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function AlunosModel(sequelize: Sequelize) {
  Alunos.init(
    {
      aluno_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      aluno_nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aluno_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "ALUNO_CREATED_AT", // Isso garante que o SQL use o nome da sua migration
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "ALUNO_UPDATED_AT",
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "ALUNOS",
      createdAt: "ALUNO_CREATED_AT",
      updatedAt: "ALUNO_UPDATED_AT",
      deletedAt: "ALUNO_DELETED_AT",
    }
  );

  return Alunos;
}
