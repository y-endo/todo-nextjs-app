import * as React from 'react';
import { NextPage } from 'next';
import ToDoContext from '../components/ToDoContext';
import { ToDo } from '../interfaces';
import Container from '../components/Container';
import ToDoList from '../components/ToDoList';

const Index: NextPage = () => {
  const title = 'ToDo';
  const content = (
    <ToDoContext.Consumer>
      {(context): JSX.Element => (
        <>
          <div className="content">
            <ToDoList todos={context.todos as ToDo[]} />
          </div>
          <style jsx>{`
            .content {
              padding: 60px 0;
            }
          `}</style>
        </>
      )}
    </ToDoContext.Consumer>
  );

  return <Container title={title} content={content} />;
};

export default Index;
