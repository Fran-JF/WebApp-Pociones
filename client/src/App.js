//* Realizamos las Importaciones
import './App.css';
//React
import React from 'react';
//UseState
import { useState } from "react";
//Axios
import Axios from "axios";
//Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //Valores que se van agregando a cada uno de los campos
  const [nombre,setNombre] = useState("");
  const [descripcion,setDescripcion] = useState("");
  const [precio,setPrecio] = useState(0);
  const [disponibilidad,setDisponibilidad] = useState(0);
  const [categoria,setCategoria] = useState("");
  const [imagen,setImagen] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);;
  // Constante donde guardamos la lista de pociones
  const [pocionesList,setPociones] = useState([]);

  //Array con la seleccion de ingredientes
  const listaIngredientes = ["Ojo de salamandra", "Escama de dragón", "Raíz de mandrágora", "Polvo de hada", "Sangre de unicornio"];
  
  //Función para añadir una poción
  const añadir = () => {
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("disponibilidad", disponibilidad);
    formData.append("categoria", categoria);
    
    //Condicional para asegurar que los ingredientes se mandaron en una cadena desde el frontend 
    if (Array.isArray(ingredientes)) {
      for (const ingrediente of ingredientes) {
        formData.append("ingredientes[]", ingrediente);
      }
    } else {
      console.log("El valor de ingredientes no es un arreglo:", ingredientes);
    }
  
    //Configuracion de axios para la consulta
    Axios.post("http://localhost:3002/crearPocion", formData).then(() => {
      getPociones();
      alert("Poción Ingresada");
    });
  };
  
  //Funcion para obtener el valor de las posciones del backend
  const getPociones = ()=>{
    Axios.get("http://localhost:3002/pociones").then((response)=>{
      //Guardamos los valores en la contante antes creada
      setPociones(response.data);
    });
  }
  //Llamamos la funcion
  getPociones();

  return (
    <div className='container'>
      <div className="App">
      <div className='lista'>
        {
          pocionesList.map((value,key)=>{
            return <div className=''>{value.nombre}</div>
          })
        }
      </div>      
      </div>

      <div className="card text-center">
        <div className="card-header">
          GESTOR DE POCIONES
        </div>
        {/*Cuerpo de la tarjeta del formulario*/}
        <div className="card-body">
        <div className="input-group mb-3">

        {/*Input para agregar la imagen de la poción*/}
        <div className="input-group-prepend">
          <span span className="input-group-text" id="basic-addon1">Imagen de la Poción:</span>
          </div>
          <input 
              onChange={(event) => {
                //Asignando la imagen del campo
                setImagen(event.target.files[0])
              }}
              type="file" accept="image/*"
              className="form-control" placeholder="Seleccione imagen de la poción..." aria-label="imagen" aria-describedby="basic-addon1"/>
        </div> 
        
        {/*Input para agregar El nombre de la poción*/}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
          </div>
          <input type="text" 
            //Actualización del campos automaticamente  
            onChange={(event)=>{
            //Asignando el valor del campo
            setNombre(event.target.value)
          }}          
          className="form-control" placeholder="Ingresa Nombre de Poción..." aria-label="nombre" aria-describedby="basic-addon1"/>
        </div>

          {/*Input para agregar la descipción*/}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Descripción:</span>
          </div>
          <textarea className="form-control mb-3" 
            onChange={(event)=>{
              //Asignando el valor del campo
              setDescripcion(event.target.value)
            }}
          aria-label="descripcion" placeholder='Ingrese descripción corta...'></textarea>
        </div>  

        {/*Input para agregar el precio*/}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Precio $:</span>
          </div>
          <input type="number"
          onChange={(event)=>{
            setPrecio(event.target.value)
          }}
          step="0.01"
          className="form-control" placeholder="Ingrese el Precio..." aria-label="precio" aria-describedby="basic-addon1"/>
        </div>
        
        {/*Input para agregar la cantidad de inventario*/}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Disponibilidad:</span>
          </div>
          <input type="number" 
              onChange={(event)=>{
                setDisponibilidad(event.target.value)
              }}
          className="form-control" placeholder="Ingresa Stock de la Poción" aria-label="inventario" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" for="inputGroupSelect01">Categoria de la Poción:</label>
          </div>
          <select className="custom-select" 
          onChange={(event)=> {setCategoria(event.target.value)}}
          id="inputGroupSelect01">
            <option selected>Categoria</option>
            <option value="1">Poción de curación</option>
            <option value="2">Poción de fuerza</option>
            <option value="3">Poción de invisibilidad</option>
            <option value="4">Poción de velocidad</option>
            <option value="4">Poción de Multi-jugos</option>
          </select>
        </div>
      
        <fieldset>
            <legend>Ingredientes:</legend>
            {listaIngredientes.map((ingrediente) => (
              <label key={ingrediente}>
                <input
                //Definimos el tipo de input
                  type="checkbox"
                  //Le pasamos el valordel ingrediente
                  value={ingrediente}
                  onChange={(event) => {
                    //Ceramos un condicional para eliminar y agregar el ingredinete seleccionado dinamicamente 
                    if (event.target.checked) {
                      setIngredientes((prevState) => {
                        const newLista = [...prevState, event.target.value];
                        console.log(newLista);
                        return newLista;
                      });
                    } else {
                      setIngredientes((prevState) => {
                        const newLista = prevState.filter(
                          (value) => value !== event.target.value
                        );
                        console.log(newLista);
                        return newLista;
                      });
                    }
                  }}
                />{" "}
                {ingrediente}
                <br />
              </label>
            ))}
          </fieldset>
        </div>
        <div className="card-footer text-muted">
          <button type="submit" className='btn btn-success' onClick={añadir}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
export default App;
