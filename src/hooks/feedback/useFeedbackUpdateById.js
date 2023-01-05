import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  feedbackUpdateById($id: String!, $user: String!, $value: String) {
    feedbackUpdateById(id: $id, user: $user, value: $value) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'feedbackUpdateById',
  });

  return {
    feedbackUpdateByIdTrigger: trigger,
    feedbackUpdateByIdResult: result,
    feedbackUpdateByIdLoading: loading,
    feedbackUpdateByIdError: error,
  };
};
