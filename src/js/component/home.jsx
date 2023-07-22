import React, { useEffect, useState } from "react";
import Header from "./Header.js";

let initialState = "";

//url del api con la que se hacen los metodos
let ApiUrl = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/adriela'

const Home = () => {

    //controla lo que se ingresa en el input
    const [todoInput, setTodoInput] = useState(initialState);

    //controla los todos agregados
    const [todos, setTodos] = useState([]);

    //metodo POST
    const createUser = async () => {
        try {
            let response = await fetch(ApiUrl, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify([])
            });

            if (response.ok) {
                //aqui se llama la funcion getTaskList
                getTaskList()
            }
        } catch (error) {
            console.log(error);
        }
    };

    //metodo PUT
    const addTaskToList = async (e) => {
        try {
            if (e.key === "Enter" || e.type == "click"){
                if (todoInput !== '') {
                    let newTaskList = [...todos, { label: todoInput, done: false }];
                    let response = await fetch(ApiUrl, {
                        method: "PUT",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(newTaskList)
                    });
                    if (response.ok) {
                        getTaskList()
                    }
                    setTodoInput('');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //asigna el valor que fue ingresado en el input
    const onInputChange = (event) => {
        setTodoInput(event.target.value);
    };

    //agrega la tarea a la lista
    // const onFormSubmit = (event) => {
    //     event.preventDefault();
    //     setTodos([...todos, todoInput]);
    //     setTodoInput("");
    // };

    //elimina una tarea
    const handleDelete = async (position) => {
        try {
            let updatedTaskList = todos.filter((value, index) => index !== position)
            //elimina una tarea desde la API
            let response = await fetch(ApiUrl, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updatedTaskList)
            });
            if (response.ok) {
                getTaskList()
            }
        } catch (error) {

        }

    };

    //elimina todos los ToDos de la lista
    async function clearList() {
        let response = await fetch(ApiUrl, {
            method: "DELETE"
        })
        if (response.ok) {
            createUser()
        } else if (response.status == 404) {
            createUser()
        }
    }

    //metodo GET
    const getTaskList = async () => {
        try {
            let response = await fetch(ApiUrl)
            if (response.ok) {
                let data = await response.json()
                setTodos(data)
            } else if (response.status == 400) {
                createUser()
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { getTaskList() }, [])

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
                        <div className="row align-items-center">
                            <div className="col">
                                <input className='form-control form-control'
                                    type='text'
                                    placeholder='enter a todo...'
                                    value={todoInput.label}
                                    name='label'
                                    required
                                    onChange={onInputChange}
                                    onKeyDown={addTaskToList}
                                ></input>
                            </div>
                            <div className="col-auto d-flex justify-content-end">
                                <button onClick={addTaskToList} className='btn-add'>
                                    <i className="fa fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/** muestra las tareas agregadas y el boton eliminar */}
                    <div>
                        <div>
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
                                            <i className="fa fa-solid fa-check"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                            )}
                        </div>

                        {/** boton para eliminar todas las tareas */}
                        <button
                            className="btn-delete mt-3"
                            onClick={() => {
                                clearList();
                            }}
                        >
                            <i className="fa fa-solid fa-trash"></i>
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
