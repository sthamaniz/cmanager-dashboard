import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  ServiceById($id: String!) {
    serviceById(id: $id) {
      _id
      title
      description
      status
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'serviceById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    serviceByIdResult: result,
    serviceByIdLoading: loading,
    serviceByIdError: error,
  };
};
