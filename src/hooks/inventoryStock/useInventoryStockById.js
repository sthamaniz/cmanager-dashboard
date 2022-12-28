import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  InventoryStockById($id: String!) {
    inventoryStockById(id: $id) {
      _id
      inventory {
        _id
        itemNumber
        title
        slug
        description
        unit
        quantity
        lowStockQuantity
        serviceIntervalType
        serviceInterval
        serviceDueDate
        status
      }
      type
      quantity
      createdAt
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'inventoryStockById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryStockByIdResult: result,
    inventoryStockByIdLoading: loading,
    inventoryStockByIdError: error,
  };
};
