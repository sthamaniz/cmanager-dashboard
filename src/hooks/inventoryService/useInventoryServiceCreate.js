import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryServiceCreate($inventory: String!, $note: String) {
    inventoryServiceCreate(inventory: $inventory, note: $note) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryServiceCreate',
  });

  return {
    inventoryServiceCreateTrigger: trigger,
    inventoryServiceCreateResult: result,
    inventoryServiceCreateLoading: loading,
    inventoryServiceCreateError: error,
  };
};
