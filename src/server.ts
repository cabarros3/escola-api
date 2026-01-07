import express from "express";
import process from "process";
import routerAlunos from "./routes/alunos.router";
import cursosRoutes from "./routes/cursos.router";
import routerMatriculas from "./routes/MatriculasRoutes";
import { initDatabase } from "./init_db";

const app = express();
const PORTA = Number(process.env.API_PORT) || 3000;

app.use(express.json());

// Registro das Rotas (Prefixadas)
app.use("/alunos", routerAlunos);
app.use("/cursos", cursosRoutes);
app.use("/matriculas", routerMatriculas);

app.get("/", (_req, res) => {
  res.json({
    message: "API Escola com Express e SQLite está funcionando!",
  });
});

async function startApp() {
  try {
    await initDatabase();

    app.listen(PORTA, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORTA}`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar a aplicação:", error);
  }
}

startApp();
