// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();


//Conectar la base de datos
db.authenticate()
    .then( () => console.log('La base de datos se ha conectado correctamente'))
    .catch( error => console.log(error) );


//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
   
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
});


// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }))
 
//Definir la carpeta publica
app.use(express.static('public'))
 
//agregar router
app.use('/', router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})