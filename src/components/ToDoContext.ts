import * as React from 'react';
import { ToDo } from '../interfaces';

type ContextProps = {
  todos?: ToDo[];
};

const ToDoContext = React.createContext<ContextProps>({});

export default ToDoContext;
