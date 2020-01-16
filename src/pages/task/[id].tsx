import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '~/interfaces';
import Container from '~/components/Container';
import ApolloClient from '~/utils/ApolloClient';
import { ToDoParts } from '~/utils/fragment';
import { gql, useMutation } from '@apollo/client';

interface ToDoApolloQueryResult extends ToDo {
  __typename: string;
}

type State = {
  todo: ToDoApolloQueryResult;
  isEdit: boolean;
};

const Task: NextPage<ToDoApolloQueryResult> = props => {
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<State>({ todo: props, isEdit: false });
  const [editToDo] = useMutation(gql`
    mutation editToDo($todo: EditToDo) {
      editToDo(todo: $todo)
    }
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
    <>
      <div className="content">
        <form className="box" onSubmit={handleSubmit}>
          <label htmlFor="title">タスク名</label>
          <p className="title">
            <input
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
          <label htmlFor="description">タスク内容</label>
          <p className="description">
            <textarea
              placeholder="内容"
              ref={inputDescription}
              id="description"
              value={state.todo.description}
              onChange={handleChange}
              readOnly={!state.isEdit}
              disabled={!state.isEdit}
            />
          </p>
          <label htmlFor="deadline">期限日</label>
          <input
            type="date"
            ref={inputDeadline}
            readOnly={!state.isEdit}
            disabled={!state.isEdit}
            value={state.todo.deadline}
            onChange={handleChange}
            id="deadline"
          />
          <label>状態</label>
          <p className="status">{state.todo.isComplete ? '完了' : '未完了'}</p>
          <div className="button-box">
            <button onClick={handleEditClick.bind(Task, state.isEdit)}>{state.isEdit ? '編集完了' : '編集'}</button>
            <button onClick={handleCompleteClick.bind(Task, state.todo.isComplete)}>{state.todo.isComplete ? ' 未完了' : '完了'}</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .content {
          padding: 60px 20px;
        }

        .box {
          display: block;
          max-width: 800px;
          padding: 20px;
          box-sizing: border-box;
          margin: 0 auto;
          border: solid 1px #ccc;
        }

        label {
          display: block;
          font-size: 1.4rem;
          margin-top: 20px;
          padding: 3px 0 3px 7px;
          border-left: solid 3px #5432fc;
          line-height: 1;
          color: #555;

          + p {
            margin-top: 5px;
          }

          &:first-child {
            margin-top: 0;
          }
        }

        p {
          font-size: 2rem;
        }

        input,
        textarea {
          display: block;
          border: solid 1px #c8bdff;
          width: 100%;
          height: 40px;
          margin-top: 8px;
          padding: 5px;
          box-sizing: border-box;
          font-size: 1.8rem;
          background: #fff;
          color: #000;
        }

        textarea {
          height: 100px;
          resize: vertical;
        }

        .button-box {
          display: flex;
          justify-content: center;
          margin: 40px auto 0;
        }

        button {
          border-radius: 20px;
          border: solid 1px #5432fc;
          background: #5432fc;
          color: #fff;
          padding: 12px 0;
          margin-right: 30px;
          font-size: 1.6rem;
          font-weight: bold;
          line-height: 1;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
          width: 200px;

          &:nth-last-child(1) {
            margin-right: 0;
          }

          &:hover {
            background: #fff;
            color: #5432fc;
          }
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

Task.getInitialProps = async (context): Promise<ToDoApolloQueryResult> => {
  const query = gql`
    {
      todo(id: ${parseInt(context.query.id as string, 10)}) {
        ...ToDoParts
      }
    }
    ${ToDoParts}
  `;

  const { data } = await ApolloClient.query({ query });

  return data.todo;
};

export default Task;
