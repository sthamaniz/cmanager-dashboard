import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryDeleteById($id: String!) {
    inventoryDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryDeleteById',
  });

  return {
    inventoryDeleteByIdTrigger: trigger,
    inventoryDeleteByIdResult: result,
    inventoryDeleteByIdLoading: loading,
    inventoryDeleteByIdError: error,
  };
};
