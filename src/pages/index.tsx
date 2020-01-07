import * as React from 'react';
import { NextPage } from 'next';

import { ToDo } from '../interfaces';
import Layout from '../components/Layout';
import Input from '../components/Input';
import ToDoList from '../components/ToDoList';

type Props = {
  latestId: number;
  todos: ToDo[];
};

const Index: NextPage<Props> = props => {
  const [latestId, setLatestId] = React.useState<number>(props.latestId);
  const [todos, setTodos] = React.useState<ToDo[]>(props.todos);

  const content = (
    <>
      <div className="content">
        <Input latestId={latestId} setLatestId={setLatestId} todos={todos} setTodos={setTodos} />
        <ToDoList todos={todos} />
      </div>
      <style jsx>{`
        .content {
          padding: 40px 0;
        }
      `}</style>
    </>
  );

  return <Layout content={content} />;
};

Index.getInitialProps = () => {
  return {
    latestId: 1,
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
