import { useRef, useState, useEffect } from "react";
import Todo from "./components/Todo";
import "./App.css";
import axios from "axios";
function App() {
  const [completed, setCompleted] = useState(0);
  const [editableTodo, setEditableTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://todolistapi-xtzp.onrender.com/todos");
        setTodos(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const addTodo = async () => {
    if (editableTodo) {
      editTodo();
      console.log("Inside Edit");
    } else {
      console.log("Inside Add");
      if (inputRef.current.value !== "") {
        try {
          const response = await axios.post("https://todolistapi-xtzp.onrender.com/todos", {
            todo: inputRef.current.value,
            isCompleted: false,
          });
          setTodos([...todos, response.data]);
        } catch (err) {
          console.log(err.message);
        }
        inputRef.current.value = "";
      }
    }
  };
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`https://todolistapi-xtzp.onrender.com/todos/${id}`);
      console.log(response.data);
      const _id = response.data._id;
      console.log(_id);
      let newTodo = todos.filter((item) => {
        return item._id !== _id;
      });
      setTodos(newTodo);
    } catch (err) {
      console.log(err.message);
    }
  };
  const completeTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);

    const updatedTodo = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    };
    try {
      const response = await axios.patch(
        `https://todolistapi-xtzp.onrender.com/todos/${id}`,
        updatedTodo
      );
      console.log(response.data);
      const _id = response.data._id;
      console.log(_id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  function moveUp(i) {
    if (i > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[i];
      updatedTodos[i] = updatedTodos[i - 1];
      updatedTodos[i - 1] = temp;
      setTodos(updatedTodos);
    }
  }
  function moveDown(i) {
    if (i < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[i];
      updatedTodos[i] = updatedTodos[i + 1];
      updatedTodos[i + 1] = temp;
      setTodos(updatedTodos);
    }
  }
  function updateTodo(todo) {
    inputRef.current.value = todo.todo;
    console.log(todo)
    setEditableTodo(todo);
  }
  const editTodo = async() =>{
    const todoToUpdate = todos.find((item) => item._id === editableTodo._id);

    const updatedTodo = {
      ...todoToUpdate,
      todo:inputRef.current.value,
    };
    try {
      const response = await axios.patch(
        `https://todolistapi-xtzp.onrender.com/todos/${editableTodo._id}`,
        updatedTodo
      );
      console.log(response.data);
      const _id = response.data._id;
      console.log(_id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, todo:response.data.todo} : todo
        )
      );
    } catch (err) {
      console.log(err.message);
    }
    setEditableTodo(null);
    inputRef.current.value = "";
  }

  return (
    <>
      <div className="container">
        <h2>Todo List</h2>
        <div className="search">
          <input type="text" ref={inputRef} />
          <button onClick={addTodo}>{editableTodo ? "Edit" : "Add"}</button>
        </div>
        <div className="completed-items">
          <span>
            Completed items : {completed} / {todos.length}
          </span>
        </div>
        <div className="buttons"></div>
        <div className="todos">
          {todos.map((item, id) => (
            <Todo
              todo={item}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
              moveUp={moveUp}
              moveDown={moveDown}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
