import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '../../interfaces';
import Container from '../../components/Container';
import ApolloClient from '../../utils/ApolloClient';
import { ToDoParts } from '../../utils/fragment';
import { gql } from '@apollo/client';

interface ToDoApolloQueryResult extends ToDo {
  __typename: string;
}

const Task: NextPage<ToDoApolloQueryResult> = props => {
  const title = props.title;
  const content = (
    <div>
      <h1>{props.title}</h1>
    </div>
  );

  return <Container title={title} content={content} />;
};

Task.getInitialProps = async (context): Promise<ToDoApolloQueryResult> => {
  const query = gql`
    {
      todo(id: ${parseInt(context.query.id as string, 10)}) {
        ...ToDoParts
      }
    }
    ${ToDoParts}
  `;

  const { data } = await ApolloClient.query({ query });

  return data.todo;
};

export default Task;
