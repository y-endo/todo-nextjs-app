import * as React from 'react';
import { NextPage } from 'next';
import Container from '~/components/Container';
import Input from '~/components/Input';

const Register: NextPage = () => {
  const title = '登録';
  const content = (
    <>
      <div className="content">
        <Input />
      </div>
      <style jsx>{`
        .content {
          padding: 60px 20px;
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

export default Register;
