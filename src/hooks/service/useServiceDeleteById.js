import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as servicesQuery } from './useServices';

const query = `
  ServiceDeleteById($id: String!) {
    serviceDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'serviceDeleteById',
    refetchQuery: servicesQuery,
  });

  return {
    serviceDeleteByIdTrigger: trigger,
    serviceDeleteByIdResult: result,
    serviceDeleteByIdLoading: loading,
    serviceDeleteByIdError: error,
  };
};
