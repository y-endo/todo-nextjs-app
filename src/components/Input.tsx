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
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (inputTitle === null || inputTitle.current === null) return;

    const title = inputTitle.current.value;

    if (title !== '') {
      const id = props.latestId + 1;

      props.setTodos(
        props.todos.concat({
          id,
          title,
          description: '説明テキスト',
          deadline: '2020-01-10',
          isComplete: false
        })
      );
      props.setLatestId(id);

      inputTitle.current.value = '';
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputTitle} />
      </form>
      <style jsx>{`
        input {
          display: block;
          border: solid 1px #ccc;
          width: 600px;
          height: 40px;
          padding: 5px;
          margin: 0 auto;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default Input;
