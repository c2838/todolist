import { useEffect, useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos'

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const remainingTodoAmount = todos.length;
  const handleChange = (value) => {
    setInputValue(value);
  };
  // 新增按鈕新增資料(todoInput)
  const handleAddTodo = async () => {
    if (!inputValue.length) {
      return;
    }
    // 更改後端資料
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      // 更改前端資料
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };
  // enter鍵新增資料(todoInput)
  const handleKeyDown = async () => {
    if (!inputValue.length) {
      return;
    }
    // 更改後端資料
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      // 更改前端資料
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };
  // 打勾完成
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      // 更新後端資料
      await patchTodo({ id, isDone: !currentTodo.isDone });
      // 更新前端資料
      setTodos((prevtodos) =>
        prevtodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          } else return todo;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  // 改變前端畫面，進入編輯樣式
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      }),
    );
  };
  // 編輯後儲存todo
  const handleSave = async ({ id, title }) => {
    try {
      // 更新後端
      await patchTodo({ id, title })
      // 更新前端
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        }),
      );
    } catch(error) {
      console.log(error)
    }
  };
  // 刪除todo
  const handleDelete = async (id) => {
    try {
      // 更新後端
      await deleteTodo(id)
      // 更新前端
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch(error) {
      console.log(error)
    }
  };
  // 初次渲染
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.log(error);
      }
    };
    getTodosAsync();
  }, []);
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onSave={handleSave}
        onDelete={handleDelete}
        onChangeMode={handleChangeMode}
      />
      <Footer remainingTodoAmount={remainingTodoAmount} />
    </div>
  );
};

export default TodoPage;
