import * as React from 'react';
import App, { Container } from 'next/app';
import ToDoContext from '../components/ToDoContext';

export default class extends App {
  constructor(props: any) {
    super(props);

    this.state = {
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
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ToDoContext.Provider value={this.state}>
          <Component {...pageProps} />
        </ToDoContext.Provider>
      </Container>
    );
  }
}
