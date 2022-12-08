import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  InventoryById($id: String!) {
    inventoryById(id: $id) {
      _id
      title
      description
      quantity
      price
      status
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'inventoryById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryByIdResult: result,
    inventoryByIdLoading: loading,
    inventoryByIdError: error,
  };
};
