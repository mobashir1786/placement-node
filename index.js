const express = require('express');
const app= express();
const cors= require('cors')
const route= require('./route')

app.use(express.json());
app.use(cors());
app.use(route);

app.get('/',(req,res)=>{
    res.send(`<h1>hello</h1>`)
})

app.listen(process.env.PORT || 1786, () => {
    console.log("server is running: http://localhost:1786");
})