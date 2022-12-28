import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as rostersQuery } from './useRosters';

const query = `
  RosterDeleteById($id: String!) {
    rosterDeleteById(id: $id) {
      _id
    }
  }
`;

export default ({ refetchVariables }) => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'rosterDeleteById',
    refetchQuery: rostersQuery,
    refetchVariables: refetchVariables || {},
  });

  return {
    rosterDeleteByIdTrigger: trigger,
    rosterDeleteByIdResult: result,
    rosterDeleteByIdLoading: loading,
    rosterDeleteByIdError: error,
  };
};
