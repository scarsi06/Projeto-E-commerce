import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",       // padrão do XAMPP
  password: "",       // se não configurou senha
  database: "santosfc_store"
});
