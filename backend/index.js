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
        console.log(err,'error');
    }
    console.log('DB connected....');
})

// get all data

app.get('/user',(req, res)=>{

    // console.log('all users');

    let qr = `SELECT * from user`;

    db.query(qr, (err, result)=>{

        if(err){
            console.log(err, 'error');
        }
        if(result.length>0){
            res.send({
                message: 'all user data',
                data: result
            })
        }
    })

})


app.listen(3000,()=>{
    console.log('server is running....');
})