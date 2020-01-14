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
          {todo.deadline !== '' && <p className="deadline">{todo.deadline}</p>}
        </a>
      </Link>
    </div>
    <style jsx>{`
      .todo-list-item {
        margin-top: 15px;
        border: solid 1px #ccc;

        &:first-child {
          margin-top: 0;
        }
      }

      a {
        display: flex;
        padding: 10px 15px;
      }

      .title {
        flex: 1;
        margin-top: 0;
      }

      .deadline {
        flex: 0;
        white-space: nowrap;
        margin-top: 0;
      }

      input[type='date'] {
        display: inline-block;
        border: none;
        font-size: 1.6rem;
      }
    `}</style>
  </>
);

export default ToDoListItem;
