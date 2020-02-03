import * as React from 'react';
import { NextPage } from 'next';
import css from '~/styles/pages/index.scss';
import { ToDo } from '~/interfaces/graphql';
import Container from '~/components/Container';
import ToDoList from '~/components/ToDoList';
import ApolloClient from '~/utils/ApolloClient';
import IndexContext from '~/components/IndexContext';
import { ToDoParts } from '~/utils/fragment';
import gql from 'graphql-tag';
import { format } from 'date-fns';

export type State = {
  todoDay: ToDo[];
  todoMonth: ToDo[];
  todoDead: ToDo[];
};

const fetchTodo = (): Promise<State> => {
  return new Promise(resolve => {
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

    ApolloClient.query<State>({ query }).then(response => {
      // 完了済のものは省く
      response.data.todoDay = response.data.todoDay.filter(todo => !todo.isComplete);
      response.data.todoMonth = response.data.todoMonth.filter(todo => !todo.isComplete);
      response.data.todoDead = response.data.todoDead.filter(todo => !todo.isComplete);

      resolve(response.data);
    });
  });
};

const Index: NextPage<State> = props => {
  const title = 'ホーム';
  const today = format(new Date(), 'yyyy-MM-dd');
  const [state, setState] = React.useState<State>(props);
  const resetState = async (): Promise<void> => {
    const data = await fetchTodo();

    setState(data);
  };
  const content = (
    <IndexContext.Provider value={{ resetIndexState: resetState }}>
      <div className={css.content}>
        <p className={css.title}>今日が期限のToDo</p>
        <ToDoList todoList={state.todoDay as ToDo[]} />
        <p className={css.title}>今月が期限のToDo</p>
        <ToDoList
          todoList={
            state.todoMonth.filter(todo => {
              if (todo.deadline !== today && parseInt(String(todo.deadline).replace(/-/g, ''), 10) > parseInt(today.replace(/-/g, ''), 10)) {
                return true;
              }
            }) as ToDo[]
          }
        />
        <p className={css.title}>期限切れのToDo</p>
        <ToDoList todoList={state.todoDead as ToDo[]} />
      </div>
    </IndexContext.Provider>
  );

  return <Container title={title} content={content} />;
};

Index.getInitialProps = async (): Promise<State> => {
  const data = await fetchTodo();

  return data;
};

export default Index;
