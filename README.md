# Mini Projeto API - Gestão Escolar

Este projeto é uma API RESTful desenvolvida para o programa Bolsa Futuro Digital (Aula 38). A aplicação permite o gerenciamento de alunos, cursos e o vínculo de matrículas entre eles.

## 🛠 Tecnologias Obrigatórias

- Node.js: Ambiente de execução.

- Express.js: Framework para a construção da API.

- Sequelize ORM & CLI: Ferramenta para mapeamento e gerenciamento do banco de dados.

- SQLite: Banco de dados relacional utilizado.

## 🚀 Como Executar o Projeto

1. Instalação de Dependências
   Após clonar o repositório, instale os pacotes necessários:

```bash
npm install
```

2. Configuração do Banco de Dados
   Para criar as tabelas e preparar o ambiente SQLite, execute as migrations:

```bash
npx sequelize-cli db:migrate
```

3. Iniciar a Aplicação
   Inicie o servidor local:

```bash
npm start
```

A aplicação estará rodando e pronta para receber requisições.

## 🛣 Endpoints da API

Abaixo estão listadas todas as rotas implementadas no sistema:

### 👥 Alunos

GET `/alunos:` Lista todos os alunos cadastrados.

GET `/alunos/:id:` Detalha as informações de um aluno específico.

POST `/alunos:` Cria um novo aluno.

PUT `/alunos/:id:` Atualiza os dados de um aluno existente.

DELETE `/alunos/:id:` Remove um aluno do sistema.

### 📚 Cursos

GET `/cursos:` Lista todos os cursos cadastrados.

GET `/cursos/:id:` Detalha as informações de um curso específico.

POST `/cursos:` Cria um novo curso.

PUT `/cursos/:id:` Atualiza os dados de um curso existente.

DELETE `cursos/:id:` Remove um curso do sistema.

### 📝 Matrículas (Relacionamento Aluno-Curso)

POST /matriculas: Cria uma matrícula ligando um aluno a um curso.

```json
Corpo esperado: {"alunoId": 1, "cursoId": 3}.
```

GET `/alunos/:id/cursos`: Lista todos os cursos em que o aluno especificado está matriculado.

GET `/cursos/:id/alunos`: Lista todos os alunos matriculados no curso especificado.

DELETE `/matriculas/:id:` (Opcional) Remove uma matrícula específica.

## 📁 Entregáveis (Testes)

Conforme os requisitos, os seguintes testes foram validados via Postman/Insomnia:

Criação de aluno e curso.

Criação de matrícula.

Consulta de cursos por aluno e alunos por curso.

Nota: Os prints das execuções estão anexados na documentação do projeto ou na pasta /assets.
