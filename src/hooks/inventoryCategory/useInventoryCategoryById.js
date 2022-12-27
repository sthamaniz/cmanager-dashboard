import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  InventoryCategoryById($id: String!) {
    inventoryCategoryById(id: $id) {
      _id
      title
      description
      isServicable
      status
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'inventoryCategoryById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryCategoryByIdResult: result,
    inventoryCategoryByIdLoading: loading,
    inventoryCategoryByIdError: error,
  };
};
