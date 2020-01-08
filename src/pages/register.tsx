import * as React from 'react';
import { NextPage } from 'next';

import { ToDo } from '../interfaces';
import Container from '../components/Container';
import Input from '../components/Input';

type Props = {
  latestId: number;
  todos: ToDo[];
};

const Register: NextPage<Props> = props => {
  const [latestId, setLatestId] = React.useState<number>(props.latestId);
  const [todos, setTodos] = React.useState<ToDo[]>(props.todos);

  const title = 'ToDo 登録';
  const content = (
    <>
      <div className="content">
        <Input latestId={latestId} setLatestId={setLatestId} todos={todos} setTodos={setTodos} />
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

Register.getInitialProps = (): Props => {
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

export default Register;
