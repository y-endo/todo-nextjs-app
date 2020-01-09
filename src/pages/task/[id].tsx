import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '../../interfaces';
import Container from '../../components/Container';

const Task: NextPage<ToDo> = props => {
  const title = props.title;
  const content = (
    <div>
      <h1>{props.title}</h1>
    </div>
  );

  return <Container title={title} content={content} />;
};

Task.getInitialProps = (context): ToDo => {
  return {
    id: parseInt(context.query.id as string, 10),
    title: 'タイトル',
    description: '説明',
    deadline: '2020-01-01',
    isComplete: false
  };
};

export default Task;
