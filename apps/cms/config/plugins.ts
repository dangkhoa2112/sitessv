export default ({ env }) => ({
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: env.bool('GRAPHQL_PLAYGROUND', true),
      depthLimit: 10,
      amountLimit: 100,
      defaultLimit: 25,
      maxLimit: 100
    }
  }
});
