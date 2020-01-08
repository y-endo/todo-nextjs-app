import * as React from 'react';
import Head from 'next/head';

import '../assets/css/reset.css';
import Layout from './Layout';

type Props = {
  title: string;
  content: JSX.Element;
};

const Container: React.FC<Props> = props => (
  <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <Layout title={props.title} content={props.content} />
    <style jsx global>{`
      html {
        font-size: 10px;
        font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans',
          'ヒラギノ角ゴ ProN W3', Arial, メイリオ, Meiryo, sans-serif;
      }

      body {
        font-size: 1.6rem;
        line-height: 1.5;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      p {
        margin-top: 10px;
      }

      input,
      button {
        -webkit-appearance: none;
        border-radius: 0;
        background: transparent;
        margin: 0;
      }
    `}</style>
  </>
);

export default Container;
