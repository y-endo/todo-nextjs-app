import * as React from 'react';
import Link from 'next/link';
import css from '~/styles/components/ToDoListItem.scss';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
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
    <div className={css['todo-list-item']}>
      <input className={css.checkbox} type="checkbox" checked={state.isComplete} onChange={handleCheckChange} />
      <Link href="/task/[id]" as={`/task/${state.id}`}>
        <a className={css.link}>
          <p className={css.title}>{state.title}</p>
          {state.deadline !== '' && <p className={css.deadline}>{state.deadline}</p>}
        </a>
      </Link>
      <button className={css.delete} onClick={handleDeleteClick}>
        削除
      </button>
    </div>
  );
};

export default ToDoListItem;
