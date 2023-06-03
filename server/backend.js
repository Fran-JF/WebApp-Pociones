//Importamos express
const express= require("express");
const app = express();
//Importamos mysql
const mysql = require("mysql");
//Cors permite o restringe solicitudes de recursos desde otros dominios
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//middlewares 
app.use(cors());
app.use(express.json());

//Creamos la conexion con la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pocioneswebapp"
});

//Función de guardado en la base de datos
app.post("/crearPocion", upload.single("imagen"), (req, res) => {
    const imagen = req.file.filename;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const disponibilidad = req.body.disponibilidad;
    const categoria = req.body.categoria;
    let ingredientes = req.body.ingredientes;
    let ingredientesString = "";

    if (Array.isArray(ingredientes)) {
        ingredientesString = ingredientes.join(", ");
    } else {
        console.log("El valor de ingredientes no es un arreglo:", ingredientes);
    }

    db.query(
        "INSERT INTO pociones(imagen, nombre, descripcion, precio, disponibilidad, categoria, ingredientes) VALUES(?,?,?,?,?,?,?)",
        [imagen, nombre, descripcion, precio, disponibilidad, categoria, ingredientesString],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Poción Ingresada Exitosamente!!");
        }
    }
    );
});  

app.listen(3002, ()=>{
    console.log("Servidor corriendo en el puerto 3002");
})