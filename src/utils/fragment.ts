import { gql } from '@apollo/client';

export const ToDoParts = gql`
  fragment ToDoParts on ToDo {
    id
    title
    description
    deadline
    isComplete
  }
`;
