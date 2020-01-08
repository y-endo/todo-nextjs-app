import * as React from 'react';
import { NextPage } from 'next';

import { ToDo } from '../interfaces';
import Container from '../components/Container';
import ToDoList from '../components/ToDoList';

type Props = {
  todos: ToDo[];
};

const Index: NextPage<Props> = props => {
  const title = 'ToDo';
  const content = (
    <>
      <div className="content">
        <ToDoList todos={props.todos} />
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

Index.getInitialProps = (): Props => {
  return {
    todos: [
      {
        id: 1,
        title: 'タイトル',
        description: '説明テキスト',
        deadline: '2020-01-11',
        isComplete: false
      }
    ]
  };
};

export default Index;
