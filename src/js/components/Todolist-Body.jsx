import React, { useEffect, useState } from "react";

const TodoListBody = () => {
    const [lista, setLista] = useState(['Aprender React', 'Aprender JavaScript', 'Aprender HTML'])

    const [tarea, setTarea] = useState('')

    async function agregarTarea(e) {

        if (e.key === 'Enter') {
            //     console.log(e.key)

            // setLista([...lista, tarea])
            // setTarea('')
            try {
                const response = await fetch('https://playground.4geeks.com/todo/todos/Pascual', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "label": tarea,
                        "is_done": false
                    })
                })

                console.log(response)
                if (response.status === 201) {
                    obtenerTarea()
                    setTarea('')

                }
            } catch (error) {
                console.log(error)
            }
        }


    }

    async function obtenerTarea() {


        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Pascual')
           // console.log(response);

            if (response.status === 404) {

                crearUsuario()
                return

            }

            const data = await response.json()
        //    console.log(data.todos);

            setLista(data.todos)



        } catch (error) {
            console.log(error)
        }



    }

    async function crearUsuario() {
        try {

            const response = await fetch('https://playground.4geeks.com/todo/users/Pascual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }

            })

            //console.log(response)

        } catch (error) {
            console.log(error)

        }
    }

    async function borrar(id) {

        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }

            })

            //console.log(response)
            if (response.status === 204) {
                obtenerTarea()

            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        obtenerTarea()

    }, [])

    return (
        <div className="container mt-3">
            <h1 className="mb-3">TodoList</h1>
            <input className="form-control mb-2" type="text"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                onKeyDown={(e) => agregarTarea(e)}
            />
            <div className="dataList">
                <ul className="list-group">
                    {lista.map((tarea, id) => (

                        <li key={id} className="list-group-item">
                            {tarea.label}
                            <button className="btn btn-danger float-end icono" onClick={() => borrar(tarea.id)}>borrar</button>
                        </li>

                    ))}

                </ul>
            </div>
            <p className="mt-3">Tareas Pendientes: {lista.length}</p>
        </div>

    );
};

export default TodoListBody

