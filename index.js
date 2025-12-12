const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// SUA connection string
const uri = const uri = process.env.MONGODB_URI;
;

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB Atlas!");
    } catch (err) {
        console.log("Erro ao conectar:", err);
    }
}
connectDB();

// LISTAR TODOS
app.get("/listar", async (req, res) => {
    const db = client.db("products");
    const collection = db.collection("produtos");
    const result = await collection.find().toArray();
    res.send(result);
});

app.post("/adicionar", async (req, res) => {
    try {
        const db = client.db("products");
        const collection = db.collection("produtos");

        const novoProduto = req.body; // recebe o JSON enviado pelo cliente
        
        const result = await collection.insertOne(novoProduto);
        res.send({
            message: "Produto adicionado com sucesso!",
            id: result.insertedId
        });
    } catch (err) {
        console.log("Erro ao adicionar produto:", err);
        res.status(500).send({ error: "Erro ao adicionar produto" });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
