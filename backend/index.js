const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


// DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'simpledb',
    port: 3306
});

// check DB connection

db.connect(err=>{
    if(err){
        console.log('error');
    }
    console.log('DB connected....');
})


app.listen(3000,()=>{
    console.log('server is running....');
})