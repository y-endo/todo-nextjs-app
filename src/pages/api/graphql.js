import { ApolloServer, gql } from 'apollo-server-micro';

const latestId = 9;
const todos = [];
for (let i = 0; i < 10; i++) {
  todos.push({
    id: i,
    title: 'タイトル' + i,
    description: '説明' + i,
    deadline: '2020-01-01',
    isComplete: false
  });
}

const typeDefs = gql`
  type ToDo {
    id: Int!
    title: String!
    description: String
    deadline: String
    isComplete: Boolean!
  }

  type Query {
    latestId: Int
    todo(id: Int): ToDo
    todos: [ToDo]
  }
`;

const resolvers = {
  Query: {
    latestId: () => latestId,
    todo: (_, args) => {
      const found = todos.find(todo => todo.id === args.id) || null;

      return found;
    },
    todos: () => todos
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};
export default server.createHandler({ path: '/api/graphql' });
