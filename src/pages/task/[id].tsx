import * as React from 'react';
import { NextPage } from 'next';
import { ToDo } from '../../interfaces';
import Container from '../../components/Container';
import ApolloClient from '../../utils/ApolloClient';
import { ToDoParts } from '../../utils/fragment';
import { gql } from '@apollo/client';

interface ToDoApolloQueryResult extends ToDo {
  __typename: string;
}

const Task: NextPage<ToDoApolloQueryResult> = props => {
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputDescription = React.useRef<HTMLTextAreaElement>(null);
  const inputDeadline = React.useRef<HTMLInputElement>(null);
  const title = props.title;
  const content = (
    <>
      <div className="content">
        <div className="box">
          <label htmlFor="input-title">タスク名</label>
          <p className="title">
            <input type="text" ref={inputTitle} placeholder="タスク名" id="input-title" value={props.title} readOnly disabled required />
          </p>
          <label htmlFor="input-description">タスク内容</label>
          <p className="description">
            <textarea placeholder="内容" ref={inputDescription} id="input-description" value={props.description} readOnly disabled />
          </p>
          <label htmlFor="input-deadline">期限日</label>
          <input type="date" ref={inputDeadline} readOnly disabled value={props.deadline} id="input-deadline" />
          <label>状態</label>
          <p className="status">{props.isComplete ? '完了' : '未完了'}</p>
        </div>
      </div>
      <style jsx>{`
        .content {
          padding: 60px 0;
        }

        .box {
          max-width: 800px;
          padding: 20px;
          box-sizing: border-box;
          margin: 0 auto;
          border: solid 1px #ccc;
        }

        label {
          display: block;
          font-size: 1.4rem;
          margin-top: 20px;
          padding: 3px 0 3px 7px;
          border-left: solid 3px #5432fc;
          line-height: 1;
          color: #555;

          + p {
            margin-top: 5px;
          }

          &:first-child {
            margin-top: 0;
          }
        }

        p {
          font-size: 2rem;
        }

        input,
        textarea {
          display: block;
          border: solid 1px #c8bdff;
          width: 100%;
          height: 40px;
          margin-top: 8px;
          padding: 5px;
          box-sizing: border-box;
          font-size: 1.8rem;
          background: #fff;
          color: #000;
        }

        textarea {
          height: 100px;
          resize: vertical;
        }
      `}</style>
    </>
  );

  return <Container title={title} content={content} />;
};

Task.getInitialProps = async (context): Promise<ToDoApolloQueryResult> => {
  const query = gql`
    {
      todo(id: ${parseInt(context.query.id as string, 10)}) {
        ...ToDoParts
      }
    }
    ${ToDoParts}
  `;

  const { data } = await ApolloClient.query({ query });

  return data.todo;
};

export default Task;
