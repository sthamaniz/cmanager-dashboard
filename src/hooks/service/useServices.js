import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Services($search: String, $status: String) {
    services(search: $search, status: $status) {
      _id
      title
      slug
      description
      status
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'services',
    fetchPolicy: 'cache-and-network',
  });

  return {
    servicesTrigger: trigger,
    servicesResult: result,
    servicesLoading: loading,
    servicesError: error,
  };
};
