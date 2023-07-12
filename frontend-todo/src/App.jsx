import { useEffect, useRef, useState } from 'react'
import './App.css'

function useGetTodos() {
    const [todos, setTodos] = useState([])
    // fetch all todos from server
    useEffect(() => {
        fetch("http://localhost:3000/todos/", {
            method: "GET"
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setTodos(data);
            })
        });

        setInterval(() => {
            fetch("http://localhost:3000/todos/", {
                method: "GET"
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    setTodos(data);
                })
            });
        }, 1000)
    }, []);

    return todos
}
function useDeleteTodo(id) {
    console.log(id)
    fetch("http://localhost:3000/todos/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        console.log("DELETED");
    })
}

function useCreateTodo(title, description) {
    const createTodo = fetch('http://localhost:3000/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    }).then(() => {
        console.log('Todo created successfully');
    });

    return createTodo
};

function App() {
    const todos = useGetTodos()

    return (
        <>
            <div>
                <h1>Easy Todo App</h1>
                <CreateTodo />
            </div>
            <div>
                {todos.map((todo) => {
                    return <div>
                        {todo.title}
                        {todo.description}
                        <DeleteTodo title={todo.description} id={todo.id} />
                    </div>
                }
                )}
            </div>
        </>
    )
}
function CreateTodo() {
    // Add a create button here so user can add a TODO.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <input
                id="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                id="description"
                placeholder="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={() => useCreateTodo(title, description)}>Create Todo</button>
        </div>
    );
}

function DeleteTodo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        {props.description}
        <button onClick={() => useDeleteTodo(props.id)}>Delete Todo</button>
    </div>
}

export default App