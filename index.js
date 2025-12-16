const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 🔐 MongoDB (Render)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI não definida no Render");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

// Conecta no Mongo UMA VEZ
async function connectDB() {
  try {
    await client.connect();
    db = client.db("products"); // nome do banco
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  }
}

connectDB();

// Rota principal (HTML)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 ROTA PARA LISTAR PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ erro: "Banco ainda não conectado" });
    }

    const produtos = await db
      .collection("produtos")
      .find({})
      .toArray();

    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// Start do servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Servidor rodando na porta:", PORT);
});
