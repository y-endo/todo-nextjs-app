import * as React from 'react';
import { ToDo } from '~/interfaces/graphql';

export type StateType = {
  todoAll?: ToDo[];
};

type ContextType = { rootState: StateType; queryRootState: () => void };

const RootContext = React.createContext<ContextType>({ rootState: {}, queryRootState: () => ({}) });

export default RootContext;
