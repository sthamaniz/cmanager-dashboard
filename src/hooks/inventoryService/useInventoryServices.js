import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  InventoryServices {
    inventoryServices {
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

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'inventoryServices',
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryServicesTrigger: trigger,
    inventoryServicesResult: result,
    inventoryServicesLoading: loading,
    inventoryServicesError: error,
  };
};
