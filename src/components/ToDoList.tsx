import * as React from 'react';
import css from '~/styles/components/ToDoList.scss';

import { ToDo } from '~/interfaces/graphql';
import ToDoListItem from './ToDoListItem';

type Props = {
  todoList: ToDo[];
};

const ToDoList: React.FC<Props> = props => {
  const items = props.todoList.map(todo => {
    return <ToDoListItem key={todo.id} todo={todo} />;
  });

  return <div className={css['todo-list']}>{items.length === 0 ? <p>タスクは有りません。</p> : items}</div>;
};

export default ToDoList;
