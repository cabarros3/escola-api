import express from "express";
// import * as dotenv from "dotenv";
import process from "process";

// Importa suas rotas modulares
import routerAlunos from "./routes/alunos.router";
import CurosRoutes from "./routes/cursos.router";
// import routerMatriculas from "./routes/matriculas.router";

// Importa a inicialização do banco
import { initDatabase } from "./init_db";
import cursosRoutes from "./routes/cursos.router";

// dotenv.config();

const app = express();
const PORTA = Number(process.env.API_PORT) || 3000;

// Middleware para ler JSON
app.use(express.json());

// Registro das Rotas (Prefixadas)
app.use("/alunos", routerAlunos);
app.use("/cursos", cursosRoutes);
// app.use("/matriculas", routerMatriculas);

// Rota de boas-vindas
app.get("/", (_req, res) => {
  res.json({
    message: "API Escola com Express e SQLite está funcionando!",
  });
});

// Inicializa o Banco e depois o Servidor
async function startApp() {
  try {
    await initDatabase(); // Chama a função que sincroniza os modelos

    app.listen(PORTA, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORTA}`);
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar a aplicação:", error);
  }
}

startApp();
