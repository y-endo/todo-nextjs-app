import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import mutationAddToDo from '~/utils/graphql/mutations/addToDo.graphql';
import css from '~/styles/components/Input.scss';

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
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label} htmlFor="input-title">
        タスク名
      </label>
      <input className={css.input} type="text" ref={inputTitle} placeholder="タスク名" id="input-title" required />
      <label className={css.label} htmlFor="input-description">
        タスク内容
      </label>
      <textarea className={css.textarea} placeholder="内容" ref={inputDescription} id="input-description" />
      <label htmlFor="input-deadline" className={css.label}>
        期限日
      </label>
      <input className={css.input} type="date" ref={inputDeadline} id="input-deadline" />
      <button className={css.button}>登録</button>
    </form>
  );
};

export default Input;
