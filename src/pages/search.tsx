import * as React from 'react';
import { NextPage } from 'next';
import AppContext from '~/components/AppContext';
import { ToDo } from '~/interfaces/graphql';
import Container from '~/components/Container';
import ToDoList from '~/components/ToDoList';

const Index: NextPage = () => {
  const { state } = React.useContext(AppContext);
  const title = '検索';
  const content = (
    <>
      <div className="content">{/* <ToDoList todoList={state.todoMonth as ToDo[]} /> */}</div>
      <style jsx>{`
        .content {
          padding: 60px 20px;
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

export default Index;
