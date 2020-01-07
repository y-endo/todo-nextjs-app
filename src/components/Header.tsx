import * as React from 'react';

export default function Header() {
  return (
    <>
      <header>
        <h1>TODO</h1>
      </header>
      <style jsx>{`
        header {
          font-size: 2.4rem;
          font-weight: bold;
          text-align: center;
          padding: 20px;
          box-shadow: 0 3px 8px rgba(#000, 0.1);
        }
      `}</style>
    </>
  );
}
