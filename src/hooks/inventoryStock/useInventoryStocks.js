import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

const query = `
  InventoryStocks {
    inventoryStocks {
      _id
      inventory {
        _id
        itemNumber
        title
        slug
        description
        unit
        quantity
        price
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
