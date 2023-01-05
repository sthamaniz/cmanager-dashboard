import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  feedbackCreate($user: String!, $value: String!) {
    feedbackCreate(user: $user, value: $value) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'feedbackCreate',
  });

  return {
    feedbackCreateTrigger: trigger,
    feedbackCreateResult: result,
    feedbackCreateLoading: loading,
    feedbackCreateError: error,
  };
};
