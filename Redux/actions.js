const Addaction = (todo) => ({type:"ADD",todo:todo});
const DeleteAction = (index) => ({ type: "DELETE", index:index });
const DeleteAllAction = () => ({ type: "DELETE_ALL" });
const EditAction = (index, updatedTodo) => ({ type: "EDIT", index, updatedTodo });

export{Addaction, DeleteAction, DeleteAllAction, EditAction };