import * as React from 'react';

type ContextType = { resetIndexState: () => void };

const IndexContext = React.createContext<ContextType>({ resetIndexState: () => ({}) });

export default IndexContext;
