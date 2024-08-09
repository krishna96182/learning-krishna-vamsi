const initialState = {todos:[{name:"default todos1",status:"complete"},
    {name:"default todos2",status:"incomplete"}
]}
const TodoReducer =(state = initialState,action)=>{
    switch (action.type) {
        case "ADD":
          return {...state,todos: [...state.todos, action.todo]};
        case "DELETE":
          return {...state,todos: state.todos.filter((_, index) => index !== action.index)};
        case "DELETE_ALL":
          return {...state,todos: []};
        case "EDIT":
          return {...state,
            todos: state.todos.map((todo, index) =>
              index === action.index ? action.updatedTodo : todo)};
    default:
        return state;
    }
}
export default TodoReducer;