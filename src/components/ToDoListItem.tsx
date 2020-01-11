import * as React from 'react';
import Link from 'next/link';
import { ToDo } from '../interfaces';

type Props = {
  todo: ToDo;
};

const ToDoListItem: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-list-item">
      <Link href="/task/[id]" as={`/task/${todo.id}`}>
        <a>
          <p className="title">{todo.title}</p>
          {todo.deadline !== '' && (
            <p className="deadline">
              <input type="date" value={todo.deadline} readOnly disabled />
            </p>
          )}
        </a>
      </Link>
    </div>
    <style jsx>{`
      .todo-list-item {
        margin-top: 10px;
        border: solid 1px #ccc;

        &:first-child {
          margin-top: 0;
        }
      }

      a {
        display: block;
        padding: 10px;
      }

      .title {
        margin-top: 0;
      }

      input[type='date'] {
        border: solid 1px #ccc;
      }
    `}</style>
  </>
);

export default ToDoListItem;
