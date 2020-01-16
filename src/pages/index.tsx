import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '~/interfaces/graphql';
import Container from '~/components/Container';
import ToDoList from '~/components/ToDoList';
import ApolloClient from '~/utils/ApolloClient';
import { ToDoParts } from '~/utils/fragment';
import { gql } from '@apollo/client';
import { format } from 'date-fns';

type Props = {
  todoDay: ToDo[];
  todoMonth: ToDo[];
  todoDead: ToDo[];
};

const Index: NextPage<Props> = props => {
  const title = 'ホーム';
  const today = format(new Date(), 'yyyy-MM-dd');
  const content = (
    <>
      <div className="content">
        <p className="title">今日が期限のToDo</p>
        <ToDoList todoList={props.todoDay as ToDo[]} />
        <p className="title">今月が期限のToDo</p>
        <ToDoList todoList={props.todoMonth.filter(todo => todo.deadline !== today) as ToDo[]} />
        <p className="title">期限切れのToDo</p>
        <ToDoList todoList={props.todoDead as ToDo[]} />
      </div>
      <style jsx>{`
        .content {
          padding: 60px 20px;
        }

        .title {
          max-width: 800px;
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 2rem;
          font-weight: bold;
          line-height: 1;
          margin: 30px auto 15px;

          &:first-child {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

Index.getInitialProps = async (): Promise<Props> => {
  const now = new Date();
  const query = gql`
    {
      todoMonth(year: ${now.getFullYear()}, month: ${now.getMonth() + 1}) {
        ...ToDoParts
      }
      todoDay(year: ${now.getFullYear()}, month: ${now.getMonth() + 1}, date: ${now.getDate()}) {
        ...ToDoParts
      }
      todoDead {
        ...ToDoParts
      }
    },
    ${ToDoParts}
  `;

  const { data } = await ApolloClient.query({ query });

  return data;
};

export default Index;
