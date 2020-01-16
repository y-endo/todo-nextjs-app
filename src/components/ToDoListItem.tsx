import * as React from 'react';
import Link from 'next/link';
import { ToDo } from '~/interfaces/graphql';

type Props = {
  todo: ToDo;
};

const ToDoListItem: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-list-item">
      <input type="checkbox" />
      <Link href="/task/[id]" as={`/task/${todo.id}`}>
        <a>
          <p className="title">{todo.title}</p>
          {todo.deadline !== '' && <p className="deadline">{todo.deadline}</p>}
        </a>
      </Link>
    </div>
    <style jsx>{`
      .todo-list-item {
        position: relative;
        margin-top: 15px;
        border: solid 1px #ccc;

        &:first-child {
          margin-top: 0;
        }
      }

      input[type='checkbox'] {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        outline: none;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border: solid 1px #ccc;
          box-sizing: border-box;
          border-radius: 50%;
        }

        &:checked {
          &::before {
            background: #5432fc;
            border-color: #5432fc;
          }
        }
      }

      a {
        display: flex;
        padding: 10px 15px 10px 40px;
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
