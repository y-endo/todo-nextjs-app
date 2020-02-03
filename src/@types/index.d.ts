declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
