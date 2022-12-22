import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryServiceDeleteById($id: String!) {
    inventoryServiceDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryServiceDeleteById',
  });

  return {
    inventoryServiceDeleteByIdTrigger: trigger,
    inventoryServiceDeleteByIdResult: result,
    inventoryServiceDeleteByIdLoading: loading,
    inventoryServiceDeleteByIdError: error,
  };
};
