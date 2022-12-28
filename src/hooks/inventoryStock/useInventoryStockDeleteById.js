import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as inventoryStocksQuery } from './useInventoryStocks';

const query = `
  InventoryStockDeleteById($id: String!) {
    inventoryStockDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryStockDeleteById',
    refetchQuery: inventoryStocksQuery,
  });

  return {
    inventoryStockDeleteByIdTrigger: trigger,
    inventoryStockDeleteByIdResult: result,
    inventoryStockDeleteByIdLoading: loading,
    inventoryStockDeleteByIdError: error,
  };
};
