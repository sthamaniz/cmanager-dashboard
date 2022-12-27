import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryCategoryUpdateById($id: String!, $title: String!, $description: String!, $isServicable: Boolean!, $status: Status!) {
    inventoryCategoryUpdateById(id: $id, title: $title, description: $description, isServicable: $isServicable, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryCategoryUpdateById',
  });

  return {
    inventoryCategoryUpdateByIdTrigger: trigger,
    inventoryCategoryUpdateByIdResult: result,
    inventoryCategoryUpdateByIdLoading: loading,
    inventoryCategoryUpdateByIdError: error,
  };
};
