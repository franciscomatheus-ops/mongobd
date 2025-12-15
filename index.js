const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// SERVE O FRONTEND
app.use(express.static(path.join(__dirname, "public")));

const uri = process.env.MONGODB_URI;
let client;
let db;

// ROTAS FRONT
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ROTAS API
app.get("/listar", async (req, res) => {
  try {
    const produtos = await db.collection("produtos").find().toArray();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

app.post("/adicionar", async (req, res) => {
  try {
    const result = await db.collection("produtos").insertOne(req.body);
    res.json({ message: "Produto adicionado!", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar produto" });
  }
});

// INICIA SERVIDOR (ANTES DO MONGO)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// CONECTA NO MONGO (SEPARADO)
async function connectMongo() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("products");
    console.log("Conectado ao MongoDB Atlas!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  }
}

connectMongo();
