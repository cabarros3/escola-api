import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ICursos {
  curso_id: string;
  curso_nome: string;
  curso_carga_horaria: number;
  curso_modalidade: "Presencial" | "EAD" | "Híbrido";
}

interface CursosCreationAttributes extends Optional<ICursos, "curso_id"> {}

class Cursos
  extends Model<ICursos, CursosCreationAttributes>
  implements ICursos
{
  public curso_id!: string;
  public curso_nome!: string;
  public curso_carga_horaria!: number;
  public curso_modalidade!: "Presencial" | "EAD" | "Híbrido";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function CursoModel(sequelize: Sequelize) {
  Cursos.init(
    {
      curso_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      curso_nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      curso_carga_horaria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      curso_modalidade: {
        type: DataTypes.ENUM("presencial", "ead", "híbrido"),
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "CURSOS",
      createdAt: "CURSO_CREATED_AT",
      updatedAt: "CURSO_UPDATED_AT",
      deletedAt: "CURSO_DELETED_AT",
    }
  );

  return Cursos;
}
