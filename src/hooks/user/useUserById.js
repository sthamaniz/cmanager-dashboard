import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  UserById($id: String!) {
    userById(id: $id) {
      _id
      email
      firstName
      lastName
      gender
      mobile
      address
      displayPicture
      source
      hours
      australianBusinessNumber
      taxFileNumber
      idType
      idNumber
      status
    }
  }
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'userById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    userByIdResult: result,
    userByIdLoading: loading,
    userByIdError: error,
  };
};
