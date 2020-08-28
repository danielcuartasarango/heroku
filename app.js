const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MySql

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'autos'
});

//obtener lista con todos los datos
app.get('/all', (req, res)=>{
    const sql = 'SELECT * FROM automoviles';
    connection.query(sql, (error, results)=> {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results);
        }else{
            res.send("Not result");
        }


    }
    );
    
});

app.get('/all/:id', (req, res)=>{
    const {id }= req.params;
    const sql = `SELECT * FROM automoviles where id= ${id}`;
    connection.query(sql, (error, results)=> {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results);
        }else{
            res.send("Not result");
        }


    });
    
});

//post
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO automoviles SET ?';
    const automovilObj ={
        nombre: req.body.nombre,     
        modelo: req.body.modelo,
        marca:  req.body.marca,
        paisorigen: req.body.paisorigen,
        descripcion: req.body.descripcion,
        linkImage: req.body.linkImage
    };
    connection.query(sql,automovilObj, error =>{
        if(error) throw error;
        res.send('Car created');

    });


});

app.put('/update/:id', (req, res) => {
   const {id } = req.params;
   const {nombre, modelo, marca, paisorigen, descripcion, linkImage} = req.body;
   const sql = `UPDATE automoviles SET nombre = '${nombre},modelo = '${modelo}, marca = '${marca},
                paisorigen = '${paisorigen}', descripcion = '${descripcion}', linkImage = '${linkImage}'
                where id = ${id}`;
    connection.query(sql,automovilObj, error =>{
        if(error) throw error;
        res.send('Car update');
    });

});

app.delete('/delete/:id', (req, res)=> {
    const {id } = req.params;
    const sql = `DELETE FROM automoviles WHERE id = ${id}`;
    connection.query(sql,error =>{
        if(error) throw error;
        res.send('Car delete');
    });

});






//Route
app.get('/',(req, res)=> {
    res.send('welcome API');
});
//check conection
connection.connect(error => {
    if(error) throw error;
    
    console.log('Database server running')
    });

app.listen(PORT, ()=>console.log(`Server runnin in port ${PORT}`))