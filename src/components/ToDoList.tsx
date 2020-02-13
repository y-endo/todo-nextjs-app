import * as React from 'react';
import css from '~/styles/components/ToDoList.scss';
import transition from '~/styles/components/CSSTransition.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ToDo } from '~/interfaces/graphql';
import ToDoListItem from './ToDoListItem';

type Props = {
  todoList: ToDo[];
};

const ToDoList: React.FC<Props> = props => {
  const items = props.todoList.map(todo => {
    return (
      <CSSTransition
        key={todo.id}
        classNames={{
          enter: transition['fade-enter'],
          enterActive: transition['fade-enter-active'],
          enterDone: transition['fade-enter-done'],
          exit: transition['fade-exit'],
          exitActive: transition['fade-exit-active'],
          exitDone: transition['fade-exit-done']
        }}
        timeout={500}
      >
        <ToDoListItem todo={todo} />
      </CSSTransition>
    );
  });

  return <div className={css['todo-list']}>{items.length === 0 ? <p>タスクはありません。</p> : <TransitionGroup>{items}</TransitionGroup>}</div>;
};

export default ToDoList;
