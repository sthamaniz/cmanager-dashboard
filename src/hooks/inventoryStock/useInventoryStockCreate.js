import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryStockCreate($inventory: String!, $type: InventoryStockType!, $quantity: Int!) {
    inventoryStockCreate(inventory: $inventory, type: $type, quantity: $quantity) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryStockCreate',
  });

  return {
    inventoryStockCreateTrigger: trigger,
    inventoryStockCreateResult: result,
    inventoryStockCreateLoading: loading,
    inventoryStockCreateError: error,
  };
};
