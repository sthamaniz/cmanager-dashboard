import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryUpdateById($id: String!, $title: String, $description: String, $unit: String, $quantity: String, $price: String, $status: Status) {
    inventoryUpdateById(id: $id, title: $title, description: $description, unit: $unit, quantity: $quantity, price: $price, status: $status) {
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
