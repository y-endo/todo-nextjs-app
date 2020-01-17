import * as React from 'react';
import { NextPage } from 'next';
import RootContext, { StateType } from '~/components/RootContext';
import { ToDo } from '~/interfaces/graphql';
import Container from '~/components/Container';
import ToDoList from '~/components/ToDoList';

const Index: NextPage = () => {
  const { rootState } = React.useContext(RootContext);
  const [state, setState] = React.useState<StateType>(rootState);
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
    <>
      <div className="content">
        <input type="text" placeholder="タスクを検索" onChange={handleChange} />
        <ToDoList todoList={state.todoAll as ToDo[]} />
      </div>
      <style jsx>{`
        .content {
          padding: 60px 20px;
        }

        input {
          display: block;
          border: solid 2px #c8bdff;
          max-width: 760px;
          width: 100%;
          height: 40px;
          padding: 5px;
          margin: 0 auto 20px;
          box-sizing: border-box;
          font-size: 1.5rem;
          background: #fff;
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

export default Index;
