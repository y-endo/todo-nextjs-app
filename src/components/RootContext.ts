import * as React from 'react';
import { ToDo } from '~/interfaces/graphql';

export type State = {
  todoAll?: ToDo[];
};

type ContextType = { rootState: State; queryRootState: () => void };

const RootContext = React.createContext<ContextType>({ rootState: {}, queryRootState: () => ({}) });

export default RootContext;
