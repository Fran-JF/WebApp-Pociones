//* Realizamos las Importaciones
import './App.css';
//React
import { useState } from "react";

function App() {

  //Valores que se van agregando a cada uno de los campos
  const [nombre,setNombre] = useState("");
  const [descripcion,setDescripcion] = useState("");
  const [Precio,setPrecio] = useState(0);
  const [disponibilidad,setDisponibilidad] = useState(0);
  const [categoria,setCategoria] = useState("");
  const [imagen,setImagen] = useState(null);

  return (
    <div className="App">
      {/*Conformación del los inputs del Formulario*/}
      <div className='formulario'>
      <label>Imagen de la Poción: <input 
      //Actualización de la imagen automaticamente
      onChange={(event) => {
        //Asignando la imagen del campo
        setImagen(event.target.files[0])
      }}
      type="file" accept="image/*"></input></label>
      
      <label>Nombre: <input
      //Actualización del campos automaticamente  
      onChange={(event)=>{
        //Asignando el valor del campo
        setNombre(event.target.value)
      }}
      type="text"></input></label>

      <label>Descripción: <textarea 
      //Actualización del campos automaticamente 
      onChange={(event)=>{
        //Asignando el valor del campo
        setDescripcion(event.target.value)
      }}
      ></textarea></label>
      
      <label>Precio: <input 
      onChange={(event)=>{
        setPrecio(event.target.value)
      }}
      type="number" step="0.01"></input></label>
      
      <label>Disponibilidad: <input 
      onChange={(event)=>{
        setDisponibilidad(event.target.value)
      }}
      type="number"></input></label>
      
      <label>Categoria de la Poción:
        <select onChange={(event)=> {setCategoria(event.target.value)}}>
          <option value="1">Poción de curación</option>
          <option value="2">Poción de fuerza</option>
          <option value="3">Poción de invisibilidad</option>
          <option value="4">Poción de velocidad</option>
        </select>
      </label>
      <button type="submit" onClick={""}>Enviar</button>   
    </div>
    </div>
  );
}

export default App;
