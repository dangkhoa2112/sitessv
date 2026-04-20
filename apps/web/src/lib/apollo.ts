import { ApolloClient, DocumentNode, HttpLink, InMemoryCache } from '@apollo/client';
import { REVALIDATE_TIME, STRAPI_GRAPHQL_URL } from './constants';

function createApolloClient(revalidate = REVALIDATE_TIME) {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: STRAPI_GRAPHQL_URL,
      fetch,
      fetchOptions: {
        next: { revalidate }
      } as RequestInit
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  });
}

function getOperationName(query: DocumentNode) {
  const operation = query.definitions.find((def) => def.kind === 'OperationDefinition');
  if (!operation || operation.kind !== 'OperationDefinition') return 'UnknownOperation';
  return operation.name?.value || 'AnonymousOperation';
}

export async function cmsQuery<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: DocumentNode,
  variables?: TVariables,
  revalidate?: number
): Promise<TData | null> {
  try {
    const client = createApolloClient(revalidate);

    const response = await client.query<TData, TVariables>({
      query,
      variables: variables as TVariables
    });

    return response.data;
  } catch (error: any) {
    if (process.env.NODE_ENV !== 'production') {
      const opName = getOperationName(query);
      const gqlMessage = error?.networkError?.result?.errors?.[0]?.message;
      const queryText = query.loc?.source?.body;
      console.error(`[cmsQuery] ${opName} failed`, gqlMessage || error?.message || error);
      if (opName === 'GetPageBySlug' && queryText) {
        console.error(queryText.slice(0, 1200));
      }
    }

    return null;
  }
}
