import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  InventoryServiceById($id: String!) {
    inventoryServiceById(id: $id) {
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
      dueDate
      note
      createdAt
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'inventoryServiceById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryServiceByIdResult: result,
    inventoryServiceByIdLoading: loading,
    inventoryServiceByIdError: error,
  };
};
