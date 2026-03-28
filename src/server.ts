import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // permite que o front (5173) acesse
app.use(express.json()); // permite receber JSON no body

// rota de registro
app.post("/auth/register", (req, res) => {
  const { cpf, email, password } = req.body;

  if (!cpf || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // colocaria a lógica de salvar no banco
  return res.json({ message: "Usuário registrado com sucesso!" });
});

// rota de login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "teste@teste.com" && password === "Senha@123") {
    return res.json({ token: "fake-jwt-token" });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
