import React, { useEffect, useState } from "react";
import Header from "./Header.js";

let initialState = {
    label: '',
    done: false,

}

let urlBase = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/adriela'

const Home = () => {

    //controla lo que se ingresa en el input
    const [todoInput, setTodoInput] = useState(initialState);

    //controla los todos agregados
    const [todos, setTodos] = useState([]);

    //asigna el valor que fue ingresado en el input
    const onInputChage = (event) => {
        setTodoInput({
            [event.target.name]: event.target.value
        });
    };

    //agrega la tarea a la lista
    const onFormSubmit = (event) => {
        event.preventDefault();
        setTodos([...todos, todoInput]);
        setTodoInput("");
    };

    //elimina una tarea
    const handleDelete = (position) => {
        setTodos(todos.filter((value, index) => index !== position))

    };

    //elimina todos los ToDos de la lista
    function clearList() {
        setTodos([]); // Frontend
        setTodoList([]); // Backend
    }


    const getTask = async () => {
        let response = await fetch(urlBase)
        let data = await response.json()
        setTodos(data)
    }

    useEffect(() => { getTask() }, [])

    return (
        //genera estructura principal del programa
        <>
            <div className="container">
                <div>
                    <div>
                        <Header />
                    </div>

                    {/** espacio para agregar tareas a la lista */}
                    <div className="mt-4">
                        <form onSubmit={onFormSubmit} className="row align-items-center">
                            <div className="col">
                                <input className='form-control form-control'
                                    type='text'
                                    placeholder='enter a todo...'
                                    value={todoInput.label}
                                    name='label'
                                    required
                                    onChange={onInputChage}
                                ></input>
                            </div>
                            <div className="col-auto d-flex justify-content-end">
                                <button className='btn-add'>
                                    <i class="fa fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/** muestra las tareas agregadas y el boton eliminar */}
                    <div>
                        <form>
                            {todos.map((todo, index) => (
                                <div className="mt-3 d-flex align-items-center">
                                    <div>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={todo.label}
                                            readOnly>

                                        </input>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn-done d-flex justify-content-end"
                                            onClick={() => handleDelete(index)}>
                                            <i class="fa fa-solid fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                            )}
                        </form>
                                

                        <button
                            className="btn-delete mt-3"
                            onClick={() => {
                                clearList();
                            }}
                        >
                            <i class="fa fa-solid fa-trash"></i>
                        </button>

                        {/** muestra cuantas tareas pendientes hay */}
                        < div >
                            <h5 className="mt-3 mb-3">{todos.length} tasks pending </h5>
                        </div>

                    </div>
                </div>


            </div >

        </>
    )

};

export default Home;
