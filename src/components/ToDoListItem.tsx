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
        <input type="date" value={todo.deadline} readOnly />
      </p>
    </div>
    <style jsx>{`
      .todo-list-item {
        flex: 0 0 calc(25% - 10px);
        margin: 0 13px 13px 0;
        padding: 10px;
        border: solid 1px #ccc;
        box-sizing: border-box;

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
      input[type='date'] {
        border: solid 1px #ccc;
      }
    `}</style>
  </>
);

export default ToDoListItem;
