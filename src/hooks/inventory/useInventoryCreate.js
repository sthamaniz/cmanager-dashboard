import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryCreate($itemNumber: String!, $title: String!, $description: String!, $unit: String!, $quantity: Int!, $price: Int!, $status: Status!) {
    inventoryCreate(itemNumber: $itemNumber, title: $title, description: $description, unit: $unit, quantity: $quantity, price: $price, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryCreate',
  });

  return {
    inventoryCreateTrigger: trigger,
    inventoryCreateResult: result,
    inventoryCreateLoading: loading,
    inventoryCreateError: error,
  };
};
