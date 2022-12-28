import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  InventoryCategories {
    inventoryCategories {
      _id
      title
      slug
      description
      isServicable
      status
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'inventoryCategories',
    fetchPolicy: 'cache-and-network',
  });

  return {
    inventoryCategoriesTrigger: trigger,
    inventoryCategoriesResult: result,
    inventoryCategoriesLoading: loading,
    inventoryCategoriesError: error,
  };
};
