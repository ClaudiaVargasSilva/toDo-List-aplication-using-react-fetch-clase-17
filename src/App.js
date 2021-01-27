import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  let nombreRef = useRef(null);
  const [tarea, setTarea] = useState([]);
  //crear otro array con useState vacio 
  const [task, setTask] = useState([]);
  //guardar crear variable de url
  const [urlApi] = useState("https://assets.breatheco.de/apis/fake/todos/user/ClaudiaVargasSilva")//declara api
  //use efect
  useEffect(() => {
    getTask(urlApi)
  }, [])
  /// getTask Metodo Get
  const getTask = url => {
    fetch(url)
      .then(Response => Response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
  ///metodo POST // getUser
  const getUser = url => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(Response => Response.json())
      .then(data => console.log(data.result))
      .catch(error => console.log(error));
  };
  //metodo PUT // upDate /////
  const updateTask = (url, task) => {

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()
    ).then(data => console.log(data)

    ).catch(error => console.log(error))

  }

  //AGREGAR TAREA CON ENTER
  const AddTarea = (e) => {
    if (e.keyCode === 13 && nombreRef.value !== "") {
      setTarea(tarea.concat(nombreRef.value));
      //metodo PUT
      let newTask = [...task, {label: nombreRef.value, done: false}]
      setTask(newTask)
      updateTask(urlApi, newTask)
      nombreRef.value = "";
    }
  }
  //AGREGAR TAREA CON BOTON
  const AddTareaB = (e) => {
    if (nombreRef.value !== "")
      setTarea(tarea.concat(nombreRef.value));
    nombreRef.value = "";

  }
  //ELIMINAR UNA TAREA
  const DeleteTarea = (index) => {
    tarea.splice(index, 1);
    setTarea([...tarea]);

    // nuevo array
    task.splice(index, 1);
    setTask([...task]);
    updateTask(urlApi,task)
    //
  };
  //funcio eliminar 
  const deleteTodo2 = () => {

    fetch(urlApi, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()
    ).then(data => console.log(data)

    ).catch(error => console.log(error))

  }

  //ELIMINAR TODAS LAS TAREAS
  const DeleteT = () => {
    setTarea([])
    ///
    deleteTodo2(urlApi); 

  }

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title text-center">To Do List </h5>
          <ul className="list-group list-group-flush">
            <div className="input-group mb-3 list-group list-group-flush">
              <input onKeyUp={AddTarea} ref={r => nombreRef = r} type="text" id="input" className="list-group-item" placeholder="What needs to be done?" />
              <div className="input-group-append list-group list-group-flush">
              <button onClick={() => getUser(urlApi)} className="btn btn-outline-secondary" type="button" id="button">Create User</button>
                <button onClick={AddTareaB} className="btn btn-outline-secondary mt-2" type="button" id="button">Add</button>
              </div>
            </div>
            {

              !!tarea.length > 0 &&
              tarea.map((valor, index) => {
                return (
                  <li className="list-group-item" key={index}>{valor} <i className="fas fa-trash float-right" id="eliminar" onClick={() => DeleteTarea(index)}></i></li>
                )
              })
            }
          </ul>
        </div>
        <div className="card-footer text-muted">
          Nº de tareas {tarea.length}
          <button className="btn btn-outline-secondary float-right" onClick={DeleteT}><i className="fas fa-trash float-right" id="eliminartodo"></i></button>
        </div>
      </div>
    </div>
  );
}

export default App;

