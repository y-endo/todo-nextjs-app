import 'isomorphic-unfetch';
import * as React from 'react';
import App from 'next/app';
import RootContext, { State } from '~/components/RootContext';
import { ApolloProvider, gql, ApolloQueryResult } from '@apollo/client';
import ApolloClient from '~/utils/ApolloClient';
import { ToDo } from '~/interfaces/graphql';
import queryToDoAll from '~/utils/graphql/queries/todoAll.graphql';
import { AppContext } from 'next/app';

export default class extends App<{}, {}, State> {
  static async getInitialProps({ Component, ctx }: AppContext): Promise<{ pageProps: any; todoAll: ToDo[] }> {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const query = gql`
      ${queryToDoAll}
    `;

    const queryResult: ApolloQueryResult<State> = await ApolloClient.query({ query });
    const { todoAll } = queryResult.data;

    return {
      pageProps,
      todoAll: todoAll as ToDo[]
    };
  }
  constructor(props: any) {
    super(props);

    this.state = {
      todoAll: props.todoAll
    };
  }

  // ルートのdidMount（最初の一回だけ実行される）
  componentDidMount(): void {
    this.queryState();
  }

  // GraphQLでstateをとってくる
  async queryState(): Promise<void> {
    const query = gql`
      ${queryToDoAll}
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
        <RootContext.Provider value={{ rootState: this.state, queryRootState: this.queryState.bind(this) }}>
          <Component {...pageProps} />
        </RootContext.Provider>
      </ApolloProvider>
    );
  }
}
