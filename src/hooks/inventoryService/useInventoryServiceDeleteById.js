import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as inventoryServicesQuery } from './useInventoryServices';

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
    refetchQuery: inventoryServicesQuery,
  });

  return {
    inventoryServiceDeleteByIdTrigger: trigger,
    inventoryServiceDeleteByIdResult: result,
    inventoryServiceDeleteByIdLoading: loading,
    inventoryServiceDeleteByIdError: error,
  };
};
