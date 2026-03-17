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

export default router;
