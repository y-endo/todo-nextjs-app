import * as React from 'react';
import Head from 'next/head';

import '../assets/css/reset.css';
import Header from '../components/Header';

type Props = {
  content: JSX.Element;
};

const Layout: React.FC<Props> = props => (
  <div>
    <Head>
      <title>TODO</title>
    </Head>
    <Header />
    {props.content}
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
  </div>
);

export default Layout;
