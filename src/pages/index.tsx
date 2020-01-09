import * as React from 'react';
import { NextPage } from 'next';
import AppContext from '../components/AppContext';
import { ToDo } from '../interfaces';
import Container from '../components/Container';
import ToDoList from '../components/ToDoList';

const Index: NextPage = () => {
  const [appState] = React.useContext(AppContext);
  const title = 'ToDo';
  const content = (
    <>
      <div className="content">
        <ToDoList todos={appState.todos as ToDo[]} />
      </div>
      <style jsx>{`
        .content {
          padding: 60px 0;
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

export default Index;
