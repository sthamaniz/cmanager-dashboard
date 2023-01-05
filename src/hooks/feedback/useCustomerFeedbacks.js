import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  CustomerFeedbacks {
    customerFeedbacks {
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
    key: 'customerFeedbacks',
    fetchPolicy: 'cache-and-network',
  });

  return {
    customerFeedbacksTrigger: trigger,
    customerFeedbacksResult: result,
    customerFeedbacksLoading: loading,
    customerFeedbacksError: error,
  };
};
