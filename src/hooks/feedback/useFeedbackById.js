import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  FeedbackById($id: String!) {
    feedbackById(id: $id) {
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

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'feedbackById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    feedbackByIdResult: result,
    feedbackByIdLoading: loading,
    feedbackByIdError: error,
  };
};
