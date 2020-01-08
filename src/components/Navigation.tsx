import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <nav>
        <Link href="/">
          <a className={router.route === '/' ? 'current' : ''}>HOME</a>
        </Link>
        <Link href="/register/">
          <a className={router.route === '/register' ? 'current' : ''}>登録</a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          flex: 0 0 250px;
          height: 100vh;
          border-right: solid 1px #ccc;
        }

        a {
          display: block;
          font-size: 1.8rem;
          padding: 15px 20px;
          border-left: solid 5px transparent;
        }

        .current {
          font-weight: bold;
          background: #f8f8f8;
          border-left: solid 5px #5432fc;
        }
      `}</style>
    </>
  );
};

export default Navigation;
