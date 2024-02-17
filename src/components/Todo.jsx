
import './Todo.css'
function Todo({todo,deleteTodo,completeTodo,moveUp,moveDown,updateTodo}){
  function handleDelete(){
     deleteTodo(todo._id);
  }

  function handleComplete(){
    completeTodo(todo._id);
  }
  function handleUp(){
    moveUp(todo._id)
  }
  function handleDown(){
    moveDown(todo._id)
  }

  return (
    <>
      <div className="todo" >
        <span  style={{textDecorationLine:todo.isCompleted? "line-through" :"none"}}><input type='checkbox' checked={todo.isCompleted}></input> {todo.todo}</span>
        <button onClick={()=>updateTodo(todo)}>📝</button>
        <button onClick={handleUp}>⬆️</button>
        <button onClick={handleDown}>⬇️</button>
        <button onClick={handleComplete}>{`${!todo.isCompleted ? '✅' : '↪️'}`}</button>
        <button onClick={handleDelete}>❌</button>
      </div>
    </>
  )
}

export default Todo