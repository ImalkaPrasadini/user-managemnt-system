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

});


// get single data

app.get('/user/:id', (req, res)=>{

    // console.log('one user');
    // console.log('get id from req==>', req.params.id);


    let gID = req.params.id;

    let qr = `SELECT * from user where id = ${gID}`;

    db.query(qr, (err, result)=>{
        if (err){
            console.log('error=>',err);
        }
        if(result.length>0){
            res.send({
                message: 'get user by ID',
                data: result
            });
        }
        else{
            res.send({
                message: 'data not found',
            })
        };
        

    })


});

// create user

app.post('/user', (req, res)=>{
    // console.log('user creates');

    console.log('creste user body==>', req.body);

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `insert into user(fullname, email, mobile)
                values('${fullName}', '${eMail}', '${mb}')`;


    db.query(qr, (err, result)=>{
        if(err){
            console.log('error=>', err);
        }
        res.send({
            message: 'data inserted',
        });
    })

});

// update data

app.put('/user/:id', (req, res)=>{
    console.log('update data=>',req.body);

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `update user set fullname = '${fullName}', email = '${eMail}', mobile = '${mb}'
              where id = ${gID}`;
     
              db.query(qr, (err, result)=>{
                if(err){
                    console.log('error=>', err);
                }
                res.send({
                    message: 'data updated',
                });
            });

});

app.delete('/user/:id', (req, res)=>{
    
    let qId = req.params.id;
    
    let qr = `delete from user where id = '${qId}'`;

    db.query(qr, (err, result)=>{
        if(err){
            console.log('error=>', err);
        }
        res.send({
            message: 'data deleted'
        });
    });
})


app.listen(3000,()=>{
    console.log('server is running');
})