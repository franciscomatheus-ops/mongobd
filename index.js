const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão usando variável do Railway
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Conecta ao banco
async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB Atlas!");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }
}
connectDB();

// Rota inicial
app.get("/", (req, res) => {
    res.send("API ONLINE ✔️");
});

// LISTAR PRODUTOS
app.get("/listar", async (req, res) => {
    try {
        const db = client.db("products");
        const collection = db.collection("produtos");

        const result = await collection.find().toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: "Erro ao listar produtos" });
    }
});

// ADICIONAR PRODUTO
app.post("/adicionar", async (req, res) => {
    try {
        const db = client.db("products");
        const collection = db.collection("produtos");

        const novo = req.body;

        const result = await collection.insertOne(novo);

        res.send({
            message: "Produto adicionado!",
            id: result.insertedId
        });
    } catch (err) {
        res.status(500).send({ error: "Erro ao adicionar produto" });
    }
});

// Porta dinâmica do Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
