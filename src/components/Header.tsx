import * as React from 'react';

type Props = {
  title: string;
};

const Header: React.FC<Props> = props => (
  <>
    <header>
      <h1>{props.title}</h1>
    </header>
    <style jsx>{`
      header {
        font-size: 2.8rem;
        font-weight: bold;
        text-align: center;
        padding: 12px 20px;
        background: #5432fc;
        color: #fff;
        box-shadow: 0 3px 8px rgba(#000, 0.1);
      }
    `}</style>
  </>
);

export default Header;
