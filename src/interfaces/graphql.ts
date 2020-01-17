import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type EditToDo = {
  id: Scalars['Int'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  deadline?: Maybe<Scalars['String']>,
  isComplete?: Maybe<Scalars['Boolean']>,
};

export type LatestId = {
   __typename?: 'LatestId',
  latestId: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addToDo?: Maybe<ToDo>,
  editToDo?: Maybe<Scalars['Boolean']>,
  deleteToDo?: Maybe<Scalars['Boolean']>,
};


export type MutationAddToDoArgs = {
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  deadline?: Maybe<Scalars['String']>
};


export type MutationEditToDoArgs = {
  todo?: Maybe<EditToDo>
};


export type MutationDeleteToDoArgs = {
  id: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  latestId?: Maybe<LatestId>,
  todo?: Maybe<ToDo>,
  todoAll?: Maybe<Array<Maybe<ToDo>>>,
  todoMonth?: Maybe<Array<Maybe<ToDo>>>,
  todoDay?: Maybe<Array<Maybe<ToDo>>>,
  todoDead?: Maybe<Array<Maybe<ToDo>>>,
};


export type QueryTodoArgs = {
  id?: Maybe<Scalars['Int']>
};


export type QueryTodoMonthArgs = {
  year: Scalars['Int'],
  month: Scalars['Int']
};


export type QueryTodoDayArgs = {
  year: Scalars['Int'],
  month: Scalars['Int'],
  date: Scalars['Int']
};

export type ToDo = {
   __typename?: 'ToDo',
  id: Scalars['Int'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  deadline?: Maybe<Scalars['String']>,
  isComplete: Scalars['Boolean'],
};

export type AddToDoMutationVariables = {
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  deadline?: Maybe<Scalars['String']>
};


export type AddToDoMutation = (
  { __typename?: 'Mutation' }
  & { addToDo: Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )> }
);

export type DeleteToDoMutationVariables = {
  id: Scalars['Int']
};


export type DeleteToDoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteToDo'>
);

export type EditToDoMutationVariables = {
  todo?: Maybe<EditToDo>
};


export type EditToDoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editToDo'>
);

export type LatestIdQueryVariables = {};


export type LatestIdQuery = (
  { __typename?: 'Query' }
  & { latestId: Maybe<(
    { __typename?: 'LatestId' }
    & Pick<LatestId, 'latestId'>
  )> }
);

export type TodoQueryVariables = {
  id: Scalars['Int']
};


export type TodoQuery = (
  { __typename?: 'Query' }
  & { todo: Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )> }
);

export type TodoAllQueryVariables = {};


export type TodoAllQuery = (
  { __typename?: 'Query' }
  & { todoAll: Maybe<Array<Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )>>> }
);

export type TodoDayQueryVariables = {
  year: Scalars['Int'],
  month: Scalars['Int'],
  date: Scalars['Int']
};


export type TodoDayQuery = (
  { __typename?: 'Query' }
  & { todoDay: Maybe<Array<Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )>>> }
);

export type TodoDeadQueryVariables = {};


export type TodoDeadQuery = (
  { __typename?: 'Query' }
  & { todoDead: Maybe<Array<Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )>>> }
);

export type TodoMonthQueryVariables = {
  year: Scalars['Int'],
  month: Scalars['Int']
};


export type TodoMonthQuery = (
  { __typename?: 'Query' }
  & { todoMonth: Maybe<Array<Maybe<(
    { __typename?: 'ToDo' }
    & Pick<ToDo, 'id' | 'title' | 'description' | 'deadline' | 'isComplete'>
  )>>> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  LatestId: ResolverTypeWrapper<LatestId>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ToDo: ResolverTypeWrapper<ToDo>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  EditToDo: EditToDo,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  LatestId: LatestId,
  Int: Scalars['Int'],
  ToDo: ToDo,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Mutation: {},
  EditToDo: EditToDo,
};

export type LatestIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['LatestId'] = ResolversParentTypes['LatestId']> = {
  latestId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addToDo?: Resolver<Maybe<ResolversTypes['ToDo']>, ParentType, ContextType, RequireFields<MutationAddToDoArgs, 'title'>>,
  editToDo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationEditToDoArgs>,
  deleteToDo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteToDoArgs, 'id'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  latestId?: Resolver<Maybe<ResolversTypes['LatestId']>, ParentType, ContextType>,
  todo?: Resolver<Maybe<ResolversTypes['ToDo']>, ParentType, ContextType, QueryTodoArgs>,
  todoAll?: Resolver<Maybe<Array<Maybe<ResolversTypes['ToDo']>>>, ParentType, ContextType>,
  todoMonth?: Resolver<Maybe<Array<Maybe<ResolversTypes['ToDo']>>>, ParentType, ContextType, RequireFields<QueryTodoMonthArgs, 'year' | 'month'>>,
  todoDay?: Resolver<Maybe<Array<Maybe<ResolversTypes['ToDo']>>>, ParentType, ContextType, RequireFields<QueryTodoDayArgs, 'year' | 'month' | 'date'>>,
  todoDead?: Resolver<Maybe<Array<Maybe<ResolversTypes['ToDo']>>>, ParentType, ContextType>,
};

export type ToDoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToDo'] = ResolversParentTypes['ToDo']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  deadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isComplete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  LatestId?: LatestIdResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  ToDo?: ToDoResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
