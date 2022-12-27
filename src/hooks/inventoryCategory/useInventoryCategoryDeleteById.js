import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryCategoryDeleteById($id: String!) {
    inventoryCategoryDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryCategoryDeleteById',
  });

  return {
    inventoryCategoryDeleteByIdTrigger: trigger,
    inventoryCategoryDeleteByIdResult: result,
    inventoryCategoryDeleteByIdLoading: loading,
    inventoryCategoryDeleteByIdError: error,
  };
};
