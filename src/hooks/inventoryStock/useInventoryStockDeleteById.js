import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

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
  });

  return {
    inventoryStockDeleteByIdTrigger: trigger,
    inventoryStockDeleteByIdResult: result,
    inventoryStockDeleteByIdLoading: loading,
    inventoryStockDeleteByIdError: error,
  };
};
