import { format, startOfMonth, endOfMonth } from 'date-fns';
import { LatestIdModel, ToDoModel } from '~/utils/Database';
import { ApolloServer, gql } from 'apollo-server-micro';
import { QueryResolvers, MutationResolvers, Resolvers } from '~/interfaces/graphql';
import schema from '~/utils/graphql/schema.graphql';

const typeDefs = gql`
  ${schema}
`;

const Query: QueryResolvers = {
  async latestId() {
    const latestId = await LatestIdModel.findOne();

    return latestId;
  },
  async todo(_, args) {
    const todo = await ToDoModel.findOne({ id: args.id });

    return todo;
  },
  async todoAll() {
    const todos = await ToDoModel.find();

    todos.sort((a, b) => {
      if (a.deadline < b.deadline) return 1;
      if (a.deadline > b.deadline) return -1;
      return 0;
    });

    return todos;
  },
  async todoMonth(_, args) {
    const date = new Date(args.year, args.month - 1);
    const start = format(startOfMonth(date), 'yyyy-MM-dd');
    const end = format(endOfMonth(date), 'yyyy-MM-dd');
    const todos = await ToDoModel.find({ deadline: { $gte: start, $lte: end } });

    todos.sort((a, b) => {
      if (a.deadline < b.deadline) return 1;
      if (a.deadline > b.deadline) return -1;
      return 0;
    });

    return todos;
  },
  async todoDay(_, args) {
    const current = format(new Date(args.year, args.month - 1, args.date), 'yyyy-MM-dd');
    const todos = await ToDoModel.find({ deadline: current });

    todos.sort((a, b) => {
      if (a.deadline < b.deadline) return 1;
      if (a.deadline > b.deadline) return -1;
      return 0;
    });

    return todos;
  },
  async todoDead() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todos = await ToDoModel.find({ deadline: { $lt: today, $ne: '' } });

    todos.sort((a, b) => {
      if (a.deadline < b.deadline) return 1;
      if (a.deadline > b.deadline) return -1;
      return 0;
    });

    return todos;
  }
};

const Mutation: MutationResolvers = {
  async addToDo(_, args) {
    // latestIdをインクリメント、更新後のid取得
    await LatestIdModel.updateOne({}, { $inc: { latestId: 1 } });
    const latestId = await LatestIdModel.findOne();

    // todoを保存
    const todo = new ToDoModel({ ...args, id: latestId.latestId, isComplete: false });
    await todo.save();

    return todo;
  },
  async editToDo(_, args) {
    if (!args.todo) return false;
    await ToDoModel.update({ id: args.todo.id }, { $set: { ...args.todo } });
    return true;
  }
};

const resolvers: Resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({ typeDefs, resolvers: resolvers as any });

export const config = {
  api: {
    bodyParser: false
  }
};
export default server.createHandler({ path: '/api/graphql' });
