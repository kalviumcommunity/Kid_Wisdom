const express = require('express');
const app = express();

const PORT = 4000;

app.get('/ping', (req,res) =>{
    res.send("Hello World");
})

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})