import * as React from 'react';
import css from '~/styles/components/Layout.scss';

import Header from './Header';
import Navigation from './Navigation';

type Props = {
  title: string;
  content: JSX.Element;
};

const Layout: React.FC<Props> = props => (
  <div className={css.container}>
    <div className={css.page}>
      <Header title={props.title} />
      <main>{props.content}</main>
    </div>
    <Navigation />
  </div>
);

export default Layout;
