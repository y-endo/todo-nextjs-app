import * as React from 'react';

import AppContext from '../components/AppContext';

const Input: React.FC = () => {
  const [appState, setAppState] = React.useContext(AppContext);
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    if (
      inputTitle === null ||
      inputTitle.current === null ||
      inputDescription === null ||
      inputDescription.current === null ||
      inputDeadline === null ||
      inputDeadline.current === null ||
      appState.latestId === void 0 ||
      appState.todos === void 0
    )
      return;

    const title = inputTitle.current.value.trim();
    const description = (inputDescription.current.value || '').trim();
    const deadline = inputDeadline.current.value || '';

    if (title === '') return;

    const id = appState.latestId + 1;

    setAppState({
      todos: [
        {
          id,
          title,
          description,
          deadline,
          isComplete: false
        }
      ].concat(appState.todos),
      latestId: id
    });

    inputTitle.current.value = '';
    inputDescription.current.value = '';
    inputDeadline.current.value = '';
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-title">タスク名</label>
        <input type="text" ref={inputTitle} placeholder="タスク名" id="input-title" required />
        <label htmlFor="input-description">タスク内容</label>
        <textarea placeholder="内容" ref={inputDescription} id="input-description" />
        <label htmlFor="input-deadline">期限日</label>
        <input type="date" ref={inputDeadline} id="input-deadline" />
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
