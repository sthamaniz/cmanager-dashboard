import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryCreate($title: String!, $description: String!, $unit: String!, $quantity: String!, $price: String!, $status: Status!) {
    inventoryCreate(title: $title, description: $description, unit: $unit, quantity: $quantity, price: $price, status: $status) {
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
