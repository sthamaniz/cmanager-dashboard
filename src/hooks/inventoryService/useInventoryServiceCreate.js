import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryStockCreate($inventory: String!, $note: String) {
    inventoryStockCreate(inventory: $inventory, note: $note) {
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
