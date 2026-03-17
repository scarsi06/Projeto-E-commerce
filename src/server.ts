import express from "express";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());

// Rotas
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
