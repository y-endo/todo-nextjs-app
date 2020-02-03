import * as React from 'react';
import { NextPage } from 'next';
import css from '~/styles/pages/search.scss';
import RootContext, { State } from '~/components/RootContext';
import { ToDo } from '~/interfaces/graphql';
import Container from '~/components/Container';
import ToDoList from '~/components/ToDoList';

const Index: NextPage = () => {
  const { rootState } = React.useContext(RootContext);
  const [state, setState] = React.useState<State>(rootState);
  const title = '検索';
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (rootState.todoAll === void 0) return;

    const value = event.currentTarget.value;

    setState({
      todoAll: rootState.todoAll.filter(todo => {
        if (todo.title.includes(value) || todo.description?.includes(value)) {
          return true;
        }
        return false;
      })
    });
  };
  const content = (
    <div className={css.content}>
      <input type="text" placeholder="タスクを検索" onChange={handleChange} className={css.input} />
      <ToDoList todoList={state.todoAll as ToDo[]} />
    </div>
  );

  return <Container title={title} content={content} />;
};

export default Index;
