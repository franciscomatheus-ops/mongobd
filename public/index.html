const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// SERVE ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, "public")));

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Conectar ao MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB Atlas!");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }
}
connectDB();

// ROTA PRINCIPAL SERVE O INDEX.HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// LISTAR
app.get("/listar", async (req, res) => {
    try {
        const db = client.db("products");
        const produtos = await db.collection("produtos").find().toArray();
        res.send(produtos);
    } catch {
        res.status(500).send({ error: "Erro ao listar" });
    }
});

// ADICIONAR
app.post("/adicionar", async (req, res) => {
    try {
        const db = client.db("products");
        const result = await db.collection("produtos").insertOne(req.body);
        res.send({ message: "Produto adicionado!", id: result.insertedId });
    } catch {
        res.status(500).send({ error: "Erro ao adicionar" });
    }
});

// PORTA DO RAILWAY
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
