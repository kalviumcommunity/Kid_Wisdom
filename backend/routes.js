const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "FunnyThingsKidsSay"; // Change as needed
const collectionName = "quotes"; // Change as needed

async function getCollection() {
    await client.connect();
    return client.db(dbName).collection(collectionName);
}

// 🟢 Create (POST) - Add a new quote
router.post('/quotes', async (req, res) => {
    const { text, author } = req.body;
    if (!text || !author) return res.status(400).json({ error: "Missing fields" });

    const collection = await getCollection();
    const result = await collection.insertOne({ text, author });
    res.json({ message: "Quote added", id: result.insertedId });
});

// 🔵 Read (GET) - Fetch all quotes
router.get('/quotes', async (req, res) => {
    const collection = await getCollection();
    const quotes = await collection.find().toArray();
    res.json(quotes);
});

// 🟡 Update (PUT) - Update a quote
router.put('/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text || !author) return res.status(400).json({ error: "Missing fields" });

    const collection = await getCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text, author } });
    res.json({ message: "Quote updated" });
});

// 🔴 Delete (DELETE) - Remove a quote
router.delete('/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Quote deleted" });
});

module.exports = router;