import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  UserLogin($email: String!, $password: String!, $rememberMe: Boolean!) {
    userLogin(email: $email, password: $password, rememberMe: $rememberMe) {
      user {
        _id
        firstName
        role
      }
      accessToken
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'userLogin',
  });

  return {
    userLoginTrigger: trigger,
    userLoginResult: result,
    userLoginLoading: loading,
    userLoginError: error,
  };
};
