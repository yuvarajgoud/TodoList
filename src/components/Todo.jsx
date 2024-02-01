
import './Todo.css'
function Todo({id,todo,deleteTodo,completeTodo,moveUp,moveDown,updateTodo}){
  function handleDelete(){
     deleteTodo(todo.id);
  }

  function handleComplete(){
    completeTodo(todo.id);
  }
  function handleUp(){
    moveUp(id)
  }
  function handleDown(){
    moveDown(id)
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