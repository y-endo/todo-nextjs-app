import * as React from 'react';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import mutationEditToDo from '~/utils/graphql/mutations/editToDo.graphql';
import mutationDeleteToDo from '~/utils/graphql/mutations/deleteToDo.graphql';
import { ToDo } from '~/interfaces/graphql';
import RootContext from '~/components/RootContext';
import IndexContext from '~/components/IndexContext';

type Props = {
  todo: ToDo;
};

const ToDoListItem: React.FC<Props> = ({ todo }) => {
  const { queryRootState } = React.useContext(RootContext);
  const { resetIndexState } = React.useContext(IndexContext);
  const [state, setState] = React.useState<ToDo>(todo);
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const [editToDo] = useMutation(gql`
    ${mutationEditToDo}
  `);
  const [deleteToDo] = useMutation(gql`
    ${mutationDeleteToDo}
  `);

  // チェックボックスクリック
  const handleCheckChange = async (): Promise<void> => {
    await editToDo({
      variables: {
        todo: {
          id: state.id,
          isComplete: !state.isComplete
        }
      }
    });

    setState({
      ...state,
      isComplete: !state.isComplete
    });

    resetIndexState();
    queryRootState();
  };

  // 削除ボタンクリック
  const handleDeleteClick = async (): Promise<void> => {
    await deleteToDo({
      variables: {
        id: state.id
      }
    });

    setDeleted(true);
  };

  // 削除済なら空を返す
  if (deleted) return <></>;

  return (
    <>
      <div className="todo-list-item">
        <input type="checkbox" checked={state.isComplete} onChange={handleCheckChange} />
        <Link href="/task/[id]" as={`/task/${state.id}`}>
          <a>
            <p className="title">{state.title}</p>
            {state.deadline !== '' && <p className="deadline">{state.deadline}</p>}
          </a>
        </Link>
        <button className="delete" onClick={handleDeleteClick}>
          削除
        </button>
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
          padding: 10px 60px 10px 40px;
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

        .delete {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 100%;
          border: none;
          cursor: pointer;

          &:hover {
            color: #5432fc;
          }
        }
      `}</style>
    </>
  );
};

export default ToDoListItem;
