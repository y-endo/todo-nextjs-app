import * as React from 'react';

import { ToDo } from '../interfaces';
import ToDoListItem from './ToDoListItem';

type Props = {
  todos: ToDo[];
};

const ToDoList: React.FC<Props> = props => {
  const items = props.todos.map(todo => {
    return <ToDoListItem key={todo.id} todo={todo} />;
  });

  return (
    <>
      <div className="todo-list">{items}</div>
      <style jsx>{`
        .todo-list {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default ToDoList;
