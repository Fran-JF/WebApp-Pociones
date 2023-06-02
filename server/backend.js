//Importamos express
const express= require("express");
const app = express();
//Importamos mysql
const mysql = require("mysql");

//Creamos la conexion con la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pocioneswebapp"
});

//Función de guardado en la base de datos
app.post("/crearPocion", (req, res) => {
    //Creamos constantes para cada una de las variables (guardamos los datos q llegan de la solicitud)
    const imagen = req.body.imagen;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const disponibilidad = req.body.disponibilidad;
    const categoria = req.body.categoria;
    const ingredientes = req.body.ingredientes;

    //Creamos la consulta SQL para crear la pocion
    db.query(
        "INSERT INTO pociones(imagen, nombre, descripcion, precio, disponibilidad, categoria, ingredientes) VALUES(?,?,?,?,?,?,?)",
        [imagen, nombre, descripcion, precio, disponibilidad, categoria, ingredientes],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
})