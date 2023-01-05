import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Feedbacks {
    feedbacks {
      _id
      user {
        _id
        email
        firstName
        lastName
        gender
        mobile
        address
        displayPicture
        source
      }
      value
      isRead
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'feedbacks',
    fetchPolicy: 'cache-and-network',
  });

  return {
    feedbacksTrigger: trigger,
    feedbacksResult: result,
    feedbacksLoading: loading,
    feedbacksError: error,
  };
};
