import * as React from 'react';

import Header from './Header';
import Navigation from './Navigation';

type Props = {
  title: string;
  content: JSX.Element;
};

const Layout: React.FC<Props> = props => (
  <>
    <div className="container">
      <div className="page">
        <Header title={props.title} />
        <main>{props.content}</main>
      </div>
      <Navigation />
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row-reverse;
      }

      .page {
        flex: 1;
      }
    `}</style>
  </>
);

export default Layout;
