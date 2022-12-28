import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as inventoriesQuery } from './useInventories';

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
    refetchQuery: inventoriesQuery,
  });

  return {
    inventoryDeleteByIdTrigger: trigger,
    inventoryDeleteByIdResult: result,
    inventoryDeleteByIdLoading: loading,
    inventoryDeleteByIdError: error,
  };
};
