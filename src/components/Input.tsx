import * as React from 'react';
import { gql, useMutation } from '@apollo/client';
import mutationAddToDo from '~/utils/graphql/mutations/addToDo.graphql';

import RootContext from '~/components/RootContext';

const Input: React.FC = () => {
  const { queryRootState } = React.useContext(RootContext);
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);
  const [addToDo] = useMutation(gql`
    ${mutationAddToDo}
  `);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (
      inputTitle === null ||
      inputTitle.current === null ||
      inputDescription === null ||
      inputDescription.current === null ||
      inputDeadline === null ||
      inputDeadline.current === null
    )
      return;

    const title = inputTitle.current.value.trim();
    const description = (inputDescription.current.value || '').trim();
    const deadline = inputDeadline.current.value || '';

    if (title === '') return;

    await addToDo({
      variables: {
        title,
        description,
        deadline
      }
    });
    queryRootState();

    inputTitle.current.value = '';
    inputDescription.current.value = '';
    inputDeadline.current.value = '';
  };

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
          padding: 5px 0 5px 7px;
          line-height: 1;
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
          resize: vertical;
        }

        button {
          display: block;
          width: 100%;
          margin: 35px auto 0;
          border: solid 1px #5432fc;
          background: #5432fc;
          color: #fff;
          padding: 12px 0;
          font-size: 1.6rem;
          font-weight: bold;
          line-height: 1;
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
