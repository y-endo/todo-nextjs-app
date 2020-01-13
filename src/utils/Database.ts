import mongoose from 'mongoose';

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'todo-nextjs-app';

mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB 接続エラー'));
database.once('open', () => console.log('MongoDB 接続'));

const latestIdSchema = new mongoose.Schema(
  {
    latestId: Number
  },
  { collection: 'latestId' }
);
export const LatestIdModel = mongoose.models.LatestId || mongoose.model('LatestId', latestIdSchema);

const toDoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    deadline: String,
    isComplete: Boolean
  },
  { collection: 'todo' }
);
export const ToDoModel = mongoose.models.ToDo || mongoose.model('ToDo', toDoSchema);

export default mongoose;
