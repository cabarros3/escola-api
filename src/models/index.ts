import sequelize from "../config/database";
import AlunosModel from "./Alunos";
import CursosModel from "./Cursos";
import MatriculasModel from "./Matriculas";

const Aluno = AlunosModel(sequelize);
const Curso = CursosModel(sequelize);
const Matricula = MatriculasModel(sequelize);

// --- Relacionamentos N:N ---
Aluno.belongsToMany(Curso, {
  through: Matricula,
  foreignKey: "aluno_id",
  otherKey: "curso_id",
  as: "cursos",
});

Curso.belongsToMany(Aluno, {
  through: Matricula,
  foreignKey: "curso_id",
  otherKey: "aluno_id",
  as: "alunos",
});

Matricula.belongsTo(Aluno, { foreignKey: "aluno_id" });
Matricula.belongsTo(Curso, { foreignKey: "curso_id" });

Aluno.hasMany(Matricula, { foreignKey: "aluno_id" });
Curso.hasMany(Matricula, { foreignKey: "curso_id" });

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Aluno, Curso, Matricula, sequelize };
