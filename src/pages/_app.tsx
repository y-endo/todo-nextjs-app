import 'isomorphic-unfetch';
import * as React from 'react';
import App from 'next/app';
import AppContext from '../components/AppContext';
import { ApolloProvider, gql } from '@apollo/client';
import ApolloClient from '../components/ApolloClient';

export default class extends App {
  constructor(props: any) {
    super(props);

    this.state = {
      latestId: 0,
      todos: []
    };
  }

  // ルートのdidMount（最初の一回だけ実行される）
  async componentDidMount(): Promise<void> {
    // GraphQLで初期stateをとってくる
    const query = gql`
      {
        latestId
        todos {
          id
          title
          description
          deadline
          isComplete
        }
      }
    `;

    const queryResult = await ApolloClient.query({ query });
    const { latestId, todos } = queryResult.data;

    this.setState({
      latestId,
      todos
    });
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={ApolloClient}>
        <AppContext.Provider value={[this.state, this.setState.bind(this)]}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </ApolloProvider>
    );
  }
}
