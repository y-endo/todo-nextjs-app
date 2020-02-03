import * as React from 'react';
import css from '~/styles/components/Navigation.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
  const router = useRouter();
  const currentClassName = `${css.link} ${css['link--current']}`;

  return (
    <nav className={css.nav}>
      <Link href="/">
        <a className={router.route === '/' ? currentClassName : css.link}>ホーム</a>
      </Link>
      <Link href="/register">
        <a className={router.route === '/register' ? currentClassName : css.link}>登録</a>
      </Link>
      <Link href="/search">
        <a className={router.route === '/search' ? currentClassName : css.link}>検索</a>
      </Link>
    </nav>
  );
};

export default Navigation;
