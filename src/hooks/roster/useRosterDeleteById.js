import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  RosterDeleteById($id: String!) {
    rosterDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'rosterDeleteById',
  });

  return {
    rosterDeleteByIdTrigger: trigger,
    rosterDeleteByIdResult: result,
    rosterDeleteByIdLoading: loading,
    rosterDeleteByIdError: error,
  };
};
