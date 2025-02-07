const express = require('express');
const app = express();

const PORT = 9000;

app.get('/ping', (req,res) =>{
    res.send("pong");
})

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})
