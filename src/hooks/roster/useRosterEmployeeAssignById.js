import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as rostersQuery } from './useRosterById';

const query = `
  RosterEmployeeAssignById($id: String!, $employee: String!) {
    rosterEmployeeAssignById(id: $id, employee: $employee) {
      _id
    }
  }
`;

export default ({ refetchVariables }) => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'rosterEmployeeAssignById',
    refetchQuery: rostersQuery,
    refetchVariables: refetchVariables || {},
  });

  return {
    rosterEmployeeAssignByIdTrigger: trigger,
    rosterEmployeeAssignByIdResult: result,
    rosterEmployeeAssignByIdLoading: loading,
    rosterEmployeeAssignByIdError: error,
  };
};
