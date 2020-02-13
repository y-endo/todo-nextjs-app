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
  const wrapTransition = (element: JSX.Element, options: { key?: string | number } = { key: '' }): JSX.Element => {
    return (
      <CSSTransition
        key={options.key}
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
        {element}
      </CSSTransition>
    );
  };
  const items =
    props.todoList.length > 0
      ? props.todoList.map(todo => {
          return wrapTransition(<ToDoListItem todo={todo} />, { key: todo.id });
        })
      : wrapTransition(<p>タスクはありません。</p>);

  return (
    <div className={css['todo-list']}>
      <TransitionGroup>{items}</TransitionGroup>
    </div>
  );
};

export default ToDoList;
