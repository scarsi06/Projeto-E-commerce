import { Router } from "express";
import { db } from "../db";   // importa a conexão com MySQL
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
  const { nome, email, senha, cpf } = req.body;  // pega os dados enviados no body

  if (!nome || !email || !senha || !cpf) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    await db.query(
      "INSERT INTO users (nome, email, senha, cpf) VALUES (?, ?, ?, ?)",
      [nome, email, hashedPassword, cpf]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error: any) {
    console.error("Erro ao cadastrar usuário:", error.message);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // busca usuário pelo email
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // compara senha
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "segredo_super_secreto", // depois você coloca isso em variável de ambiente
      { expiresIn: "1h" }
    );

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

export default router;
