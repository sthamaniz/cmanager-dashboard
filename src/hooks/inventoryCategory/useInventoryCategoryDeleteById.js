import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as inventoryCategoriesQuery } from './useInventoryCategories';

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
    refetchQuery: inventoryCategoriesQuery,
  });

  return {
    inventoryCategoryDeleteByIdTrigger: trigger,
    inventoryCategoryDeleteByIdResult: result,
    inventoryCategoryDeleteByIdLoading: loading,
    inventoryCategoryDeleteByIdError: error,
  };
};
