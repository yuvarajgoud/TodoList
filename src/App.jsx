import { useRef, useState , useEffect} from 'react'
import Todo from './components/Todo'
import './App.css'
function App() {
  const [completed,setCompleted]=useState(0);
  const [editableTodo,setEditableTodo]=useState(null);
  const [todos,setTodos]=useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  })
  const inputRef=useRef(null)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    let complete= todos.filter((item)=>{
      return item.isCompleted
    })
    setCompleted(complete.length)
  }, [todos]);
  function addTodo(){
    if(editableTodo){
      editTodo()
      console.log("Inside Edit")
    } else {
      console.log("Inside Add")
      if(inputRef.current.value !== ""){
        if(todos.length === 0){
          setTodos([...todos, { id : 0,todo:inputRef.current.value,isCompleted:false}])
        }
        else {
          setTodos([...todos, { id :todos.length,todo:inputRef.current.value,isCompleted:false}])
        }
          inputRef.current.value=""
        }  
    }
  }
  function deleteTodo(id){
     let newTodo=todos.filter((item)=>{
      return item.id!==id
     })
     setTodos(newTodo)

  }
  function completeTodo(id) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
  }
  function moveUp(i){
    if(i>0){
      const updatedTodos=[...todos]
      const temp = updatedTodos[i];
      updatedTodos[i] = updatedTodos[i - 1];
      updatedTodos[i - 1] = temp;
       setTodos(updatedTodos)
    }
  }
  function moveDown(i){
    if(i< todos.length-1){
      const updatedTodos=[...todos]
      const temp = updatedTodos[i];
      updatedTodos[i] = updatedTodos[i + 1];
      updatedTodos[i + 1] = temp;
       setTodos(updatedTodos)
    }
  }
  function updateTodo(todo){
    inputRef.current.value=todo.todo
    setEditableTodo(todo)
  }
  function editTodo(){
    const index=todos.findIndex((item,id)=>item.id===editableTodo.id)
    const newTodos=[...todos]
    const todo={...editableTodo}
    newTodos.splice(index,1,{...todo,todo:inputRef.current.value})
    setTodos(newTodos)
    setEditableTodo(null)
    inputRef.current.value=''
  }
  
  return (
    <>
      <div className='container'>
        <h2>Todo List</h2>
        <div className='search'>
          <input type="text" ref={inputRef} />
          <button onClick={addTodo}>{editableTodo ? 'Edit' : 'Add' }</button>
        </div>
        <div className='completed-items'>
          <span>Completed items : {completed} / {todos.length}</span>
        </div>
        <div className='buttons'>
          
        </div>
        <div className='todos'>
            {todos.map((item,id)=>(
              <Todo id={id} todo={item} updateTodo={updateTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} moveUp={moveUp} moveDown={moveDown}/>
            )
            )}
        </div>
      </div>
    </>
  )
}

export default App
