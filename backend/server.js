
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("usuarios.db", (err) => {
    if (err) {
        return console.error("Erro ao conectar ao banco de dados:", err.message);
    }
    console.log("Conectado ao banco de dados SQLite.");

    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela:", err.message);
        }
        console.log("Tabela 'usuarios' verificada/criada.");
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    db.get(query, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Erro no servidor." });
        }

        if (row) {
            res.json({ message: "Login realizado com sucesso!", user: row });
        } else {
            res.status(401).json({ error: "Credenciais inválidas." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
