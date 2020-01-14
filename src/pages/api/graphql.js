import { format, startOfMonth, endOfMonth } from 'date-fns';
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
    todoMonth(year: Int!, month: Int!): [ToDo]
    todoDay(year: Int!, month: Int!, date: Int!): [ToDo]
    todoDead: [ToDo]
  }

  type Mutation {
    addToDo(title: String!, description: String, deadline: String): ToDo
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
    },
    todoMonth: async (_, args) => {
      const date = new Date(args.year, args.month - 1);
      const start = format(startOfMonth(date), 'yyyy-MM-dd');
      const end = format(endOfMonth(date), 'yyyy-MM-dd');
      const todos = await ToDoModel.find({ deadline: { $gte: start, $lte: end } });

      return todos;
    },
    todoDay: async (_, args) => {
      const current = format(new Date(args.year, args.month - 1, args.date), 'yyyy-MM-dd');
      const todos = await ToDoModel.find({ deadline: current });

      return todos;
    },
    todoDead: async (_, args) => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todos = await ToDoModel.find({ deadline: { $lt: today } });

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
