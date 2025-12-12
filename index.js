const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function start() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB Atlas!");

        // ROTAS
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "index.html"));
        });

        app.get("/listar", async (req, res) => {
            try {
                const db = client.db("products");
                const produtos = await db.collection("produtos").find().toArray();
                res.send(produtos);
            } catch {
                res.status(500).send({ error: "Erro ao listar" });
            }
        });

        app.post("/adicionar", async (req, res) => {
            try {
                const db = client.db("products");
                const result = await db.collection("produtos").insertOne(req.body);
                res.send({ message: "Produto adicionado!", id: result.insertedId });
            } catch {
                res.status(500).send({ error: "Erro ao adicionar" });
            }
        });

        // INICIA O SERVIDOR APÓS CONECTAR AO BANCO
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
}

start();
