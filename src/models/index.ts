import sequelize from "../config/database";
import AlunosModel from "./Alunos";
import CursosModel from "./Cursos";
import MatriculasModel from "./Matriculas";

// 1. Inicialize os Modelos
const Aluno = AlunosModel(sequelize);
const Curso = CursosModel(sequelize);
const Matricula = MatriculasModel(sequelize);

// 2. Defina os Relacionamentos N:N (Muitos-para-Muitos)
// Remova o hasMany/belongsTo se eles ainda estiverem aí.

Aluno.belongsToMany(Curso, {
  through: Matricula,
  foreignKey: "aluno_id",
  otherKey: "curso_id",
  as: "cursos", // Nome único para a associação
});

Curso.belongsToMany(Aluno, {
  through: Matricula,
  foreignKey: "curso_id",
  otherKey: "aluno_id",
  as: "alunos", // Nome único para a associação
});

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Aluno, Curso, Matricula, sequelize };
