import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Inventories {
    inventories {
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
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'inventories',
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoriesTrigger: trigger,
    inventoriesResult: result,
    inventoriesLoading: loading,
    inventoriesError: error,
  };
};
