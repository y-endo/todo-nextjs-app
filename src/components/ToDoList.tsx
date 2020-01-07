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
          display: flex;
          flex-wrap: wrap;
          max-width: calc(100% - 40px);
          margin: 30px auto 0;
        }
      `}</style>
    </>
  );
};

export default ToDoList;
