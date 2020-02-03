import * as React from 'react';
import Head from 'next/head';

import '~/assets/css/reset.css';
import '~/styles/base.scss';
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
  </>
);

export default Container;
