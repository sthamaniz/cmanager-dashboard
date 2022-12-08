import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as usersQuery } from './useUsers';

const query = `
  userDeleteById($id: String!) {
    userDeleteById(id: $id) {
      _id
    }
  }
`;

export default ({ refetchVariables }) => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'userDeleteById',
    refetchQuery: usersQuery,
    refetchVariables: refetchVariables || {},
  });

  return {
    userDeleteByIdTrigger: trigger,
    userDeleteByIdResult: result,
    userDeleteByIdLoading: loading,
    userDeleteByIdError: error,
  };
};
