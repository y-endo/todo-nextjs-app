import * as React from 'react';

import { ToDo } from '../interfaces';

type Props = {
  latestId: number;
  setLatestId: React.Dispatch<React.SetStateAction<number>>;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const Input: React.FC<Props> = props => {
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    if (inputTitle === null || inputTitle.current === null) return;
    if (inputDescription === null || inputDescription.current === null) return;
    if (inputDeadline === null || inputDeadline.current === null) return;

    const title = inputTitle.current.value.trim();
    const description = inputDescription.current.value.trim();
    const deadline = inputDeadline.current.value;

    if (title !== '' && description !== '') {
      const id = props.latestId + 1;

      props.setTodos(
        props.todos.concat({
          id,
          title,
          description,
          deadline,
          isComplete: false
        })
      );
      props.setLatestId(id);

      inputTitle.current.value = '';
      inputDescription.current.value = '';
      inputDeadline.current.value = '';
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-title">タスク名</label>
        <input type="text" ref={inputTitle} placeholder="タスク名" id="input-title" required />
        <label htmlFor="input-description">タスク内容</label>
        <textarea placeholder="内容" ref={inputDescription} id="input-description" required />
        <label htmlFor="input-deadline">期限日</label>
        <input type="date" ref={inputDeadline} id="input-deadline" required />
        <button>登録</button>
      </form>
      <style jsx>{`
        form {
          display: block;
          max-width: 800px;
          padding: 0 20px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        label {
          display: block;
          font-size: 1.6rem;
          margin-top: 30px;
          padding-left: 7px;
          border-left: solid 3px #5432fc;

          &:first-child {
            margin-top: 0;
          }
        }

        input,
        textarea {
          display: block;
          border: solid 1px #c8bdff;
          width: 100%;
          height: 40px;
          padding: 5px;
          margin-top: 8px;
          box-sizing: border-box;
          font-size: 1.5rem;
          background: #fff;
        }

        textarea {
          height: 100px;
        }

        button {
          display: block;
          width: 100%;
          margin: 35px auto 0;
          border: solid 1px #5432fc;
          background: #5432fc;
          color: #fff;
          padding: 10px 0;
          font-size: 1.6rem;
          font-weight: bold;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;

          &:hover {
            background: #fff;
            color: #5432fc;
          }
        }
      `}</style>
    </>
  );
};

export default Input;
