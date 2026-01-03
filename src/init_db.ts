import sequelize from "./config/database";
import AlunosModel from "./models/Alunos";
import CursosModel from "./models/Cursos";
import MatriculasModel from "./models/Matriculas";

export async function initDatabase() {
  // 1. Inicializa
  const Aluno = AlunosModel(sequelize);
  const Curso = CursosModel(sequelize);
  const Matricula = MatriculasModel(sequelize);

  // 2. Associações (N:N)
  Aluno.belongsToMany(Curso, {
    through: Matricula,
    foreignKey: "aluno_id",
    as: "cursos",
  });
  Curso.belongsToMany(Aluno, {
    through: Matricula,
    foreignKey: "curso_id",
    as: "alunos",
  });

  // 3. Sincroniza
  await sequelize.sync({ alter: true });
  console.log("✅ Banco de dados sincronizado.");
}
