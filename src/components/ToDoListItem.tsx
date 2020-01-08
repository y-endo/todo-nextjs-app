import * as React from 'react';

import { ToDo } from '../interfaces';

type Props = {
  todo: ToDo;
};

const ToDoListItem: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-list-item">
      <p className="title">{todo.title}</p>
      <p className="deadline">
        <input type="date" value={todo.deadline} readOnly disabled />
      </p>
    </div>
    <style jsx>{`
      .todo-list-item {
        margin-top: 10px;
        padding: 10px;
        border: solid 1px #ccc;
        box-sizing: border-box;

        &:first-child {
          margin-top: 0;
        }
      }
      input[type='date'] {
        border: solid 1px #ccc;
      }
    `}</style>
  </>
);

export default ToDoListItem;
