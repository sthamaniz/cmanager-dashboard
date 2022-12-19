import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryUpdateById($itemNumber: String!, $id: String!, $title: String, $description: String, $unit: String, $lowStockQuantity: Int!, $price: Int, $status: Status) {
    inventoryUpdateById(itemNumber: $itemNumber, id: $id, title: $title, description: $description, unit: $unit, lowStockQuantity: $lowStockQuantity, price: $price, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryUpdateById',
  });

  return {
    inventoryUpdateByIdTrigger: trigger,
    inventoryUpdateByIdResult: result,
    inventoryUpdateByIdLoading: loading,
    inventoryUpdateByIdError: error,
  };
};
