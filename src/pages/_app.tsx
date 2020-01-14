import 'isomorphic-unfetch';
import * as React from 'react';
import App from 'next/app';
import AppContext from '../components/AppContext';
import { ApolloProvider, gql } from '@apollo/client';
import ApolloClient from '../utils/ApolloClient';
import { ToDoParts } from '../utils/fragment';
import { ToDo } from '../interfaces';

type State = {
  todoAll: ToDo[];
};

export default class extends App<any, any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      todoAll: []
    };
  }

  // ルートのdidMount（最初の一回だけ実行される）
  componentDidMount(): void {
    this.queryState();
  }

  // GraphQLでstateをとってくる
  async queryState(): Promise<void> {
    const query = gql`
      {
        todoAll {
          ...ToDoParts
        }
      }
      ${ToDoParts}
    `;

    const queryResult = await ApolloClient.query({ query });
    const { todoAll } = queryResult.data;

    this.setState({
      todoAll
    });
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={ApolloClient}>
        <AppContext.Provider value={{ state: this.state, queryState: this.queryState.bind(this) }}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ApolloProvider>
    );
  }
}
