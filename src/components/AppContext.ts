import * as React from 'react';
import { ToDo } from '~/interfaces';

type StateType = {
  todoAll?: ToDo[];
};

type ContextType = { state: StateType; queryState: () => void };

const AppContext = React.createContext<ContextType>({ state: {}, queryState: () => ({}) });

export default AppContext;
