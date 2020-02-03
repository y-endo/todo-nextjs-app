import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '~/interfaces/graphql';
import css from '~/styles/pages/task.scss';
import Container from '~/components/Container';
import ApolloClient from '~/utils/ApolloClient';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import mutationEditToDo from '~/utils/graphql/mutations/editToDo.graphql';
import queryToDo from '~/utils/graphql/queries/todo.graphql';
import RootContext from '~/components/RootContext';

type State = {
  todo: ToDo;
  isEdit: boolean;
};

const Task: NextPage<ToDo> = props => {
  const { queryRootState } = React.useContext(RootContext);
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<State>({ todo: props, isEdit: false });
  const [editToDo] = useMutation(gql`
    ${mutationEditToDo}
  `);
  const title = props.title;
  const handleEditClick = async (isEdit: boolean): Promise<void> => {
    // タイトル（必須）が空の場合スルー
    if (inputTitle && inputTitle.current && inputTitle.current.value === '') return;

    // 編集状態の変更
    setState({
      ...state,
      isEdit: !isEdit
    });

    // 編集を完了させる
    if (isEdit) {
      if (inputDescription === null || inputDescription.current === null || inputDeadline === null || inputDeadline.current === null) return;

      const title = (inputTitle.current as HTMLInputElement).value;
      const description = inputDescription.current.value;
      const deadline = inputDeadline.current.value;

      await editToDo({
        variables: {
          todo: {
            id: props.id,
            title,
            description,
            deadline
          }
        }
      });

      setState({
        todo: {
          ...state.todo,
          title,
          description,
          deadline
        },
        isEdit: false
      });
    }
  };
  const handleCompleteClick = async (isComplete: boolean): Promise<void> => {
    await editToDo({
      variables: {
        todo: {
          id: props.id,
          isComplete: !isComplete
        }
      }
    });

    setState({
      ...state,
      todo: {
        ...state.todo,
        isComplete: !isComplete
      }
    });

    queryRootState();
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> => {
    setState({
      ...state,
      todo: {
        ...state.todo,
        [event.currentTarget.id]: event.currentTarget.value
      }
    });
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
  };
  const content = (
    <div className={css.content}>
      <form className={css.box} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor="title">
          タスク名
        </label>
        <p className={css.text}>
          <input
            className={css.input}
            type="text"
            ref={inputTitle}
            placeholder="タスク名"
            id="title"
            value={state.todo.title}
            onChange={handleChange}
            readOnly={!state.isEdit}
            disabled={!state.isEdit}
            required
          />
        </p>
        <label className={css.label} htmlFor="description">
          タスク内容
        </label>
        <p className={css.text}>
          <textarea
            className={css.textarea}
            placeholder="内容"
            ref={inputDescription}
            id="description"
            value={state.todo.description as string}
            onChange={handleChange}
            readOnly={!state.isEdit}
            disabled={!state.isEdit}
          />
        </p>
        <label className={css.label} htmlFor="deadline">
          期限日
        </label>
        <input
          className={css.input}
          type="date"
          ref={inputDeadline}
          readOnly={!state.isEdit}
          disabled={!state.isEdit}
          value={state.todo.deadline as string}
          onChange={handleChange}
          id="deadline"
        />
        <label className={css.label}>状態</label>
        <p className={css.text}>{state.todo.isComplete ? '完了' : '未完了'}</p>
        <div className={css['button-box']}>
          <button className={css.button} onClick={handleEditClick.bind(Task, state.isEdit)}>
            {state.isEdit ? '編集完了' : '編集'}
          </button>
          <button className={css.button} onClick={handleCompleteClick.bind(Task, state.todo.isComplete)}>
            {state.todo.isComplete ? ' 未完了' : '完了'}
          </button>
        </div>
      </form>
    </div>
  );

  return <Container title={title} content={content} />;
};

Task.getInitialProps = async (context): Promise<ToDo> => {
  const query = gql`
    ${queryToDo}
  `;

  const { data } = await ApolloClient.query({ query, variables: { id: parseInt(context.query.id as string, 10) } });

  return data.todo;
};

export default Task;
