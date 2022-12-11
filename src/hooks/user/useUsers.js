import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Users($search: String, $role: UserRole!) {
    users(search: $search, role: $role) {
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

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'users',
    fetchPolicy: 'cache-and-network',
  });

  return {
    usersTrigger: trigger,
    usersResult: result,
    usersLoading: loading,
    usersError: error,
  };
};
