import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  InventoryCategoryCreate($title: String!, $description: String!, $isServicable: Boolean!, $status: Status!) {
    inventoryCategoryCreate(title: $title, description: $description, isServicable: $isServicable, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'inventoryCategoryCreate',
  });

  return {
    inventoryCategoryCreateTrigger: trigger,
    inventoryCategoryCreateResult: result,
    inventoryCategoryCreateLoading: loading,
    inventoryCategoryCreateError: error,
  };
};
