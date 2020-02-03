import * as React from 'react';
import { NextPage } from 'next';
import css from '~/styles/pages/register.scss';
import Container from '~/components/Container';
import Input from '~/components/Input';

const Register: NextPage = () => {
  const title = '登録';
  const content = (
    <div className={css.content}>
      <Input />
    </div>
  );

  return <Container title={title} content={content} />;
};

export default Register;
