import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  InventoryStocks($startDate: String, $endDate: String) {
    inventoryStocks(startDate: $startDate, endDate: $endDate) {
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

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'inventoryStocks',
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryStocksTrigger: trigger,
    inventoryStocksResult: result,
    inventoryStocksLoading: loading,
    inventoryStocksError: error,
  };
};
