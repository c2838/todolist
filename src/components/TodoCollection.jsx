import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggle, onSave, onDelete, onChangeMode }) => {
  return (
    <div>
      {todos.map(todo => 
        <TodoItem key={todo.id} todo={todo} />
      )}
    </div>
  );
};

export default TodoCollection;
