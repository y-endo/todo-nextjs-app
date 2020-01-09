import * as React from 'react';
import App, { Container } from 'next/app';
import AppContext from '../components/AppContext';

export default class extends App {
  constructor(props: any) {
    super(props);

    this.state = {
      latestId: 0,
      todos: []
    };
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <AppContext.Provider value={[this.state, this.setState.bind(this)]}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </Container>
    );
  }
}
