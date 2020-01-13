import { LatestIdModel, ToDoModel } from '../../utils/Database';
import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type LatestId {
    latestId: Int!
  }

  type ToDo {
    id: Int!
    title: String!
    description: String
    deadline: String
    isComplete: Boolean!
  }

  type Query {
    latestId: LatestId
    todo(id: Int): ToDo
    todoAll: [ToDo]
  }

  type Mutation {
    addToDo(title: String!, description: String, deadline: String): ToDo
  }

  type Subscription {
    todoAdded: ToDo
  }
`;

const resolvers = {
  Query: {
    latestId: async () => {
      const latestId = await LatestIdModel.findOne();

      return latestId;
    },
    todo: async (_, args) => {
      const todo = await ToDoModel.findOne({ id: args.id });

      return todo;
    },
    todoAll: async () => {
      const todos = await ToDoModel.find();

      return todos;
    }
  },
  Mutation: {
    addToDo: async (_, args) => {
      // latestIdをインクリメント、更新後のid取得
      await LatestIdModel.updateOne({}, { $inc: { latestId: 1 } });
      const latestId = await LatestIdModel.findOne();

      // todoを保存
      const todo = new ToDoModel({ ...args, id: latestId.latestId, isComplete: false });
      await todo.save();

      return todo;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};
export default server.createHandler({ path: '/api/graphql' });
