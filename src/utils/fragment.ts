import gql from 'graphql-tag';

export const ToDoParts = gql`
  fragment ToDoParts on ToDo {
    id
    title
    description
    deadline
    isComplete
  }
`;
