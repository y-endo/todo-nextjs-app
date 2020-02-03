import * as React from 'react';
import css from '~/styles/components/Header.scss';

type Props = {
  title: string;
};

const Header: React.FC<Props> = props => (
  <header className={css.header}>
    <h1>{props.title}</h1>
  </header>
);

export default Header;
