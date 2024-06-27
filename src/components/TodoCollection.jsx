import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggleDone, onSave, onDelete, onChangeMode }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={(id) => onToggleDone?.(id)}
          onSave={({ id, title }) => onSave({ id, title })}
          onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
