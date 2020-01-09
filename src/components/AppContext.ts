import * as React from 'react';
import { ToDo } from '../interfaces';

type StateType = {
  latestId?: number;
  todos?: ToDo[];
};

type ContextType = [StateType, (state: StateType) => void];

const AppContext = React.createContext<ContextType>([{}, () => ({})]);

export default AppContext;
