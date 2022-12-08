import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  UserRegister($email: String!, $password: String!, $firstName: String!, $lastName: String!, $gender: UserGender!, $mobile: String!, $address: String, $source: UserSource, $role: UserRole!, $status: Status!) {
    userRegister(email: $email, password: $password, firstName: $firstName, lastName: $lastName, gender: $gender, mobile: $mobile, address: $address, source: $source, role: $role, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'userRegister',
  });

  return {
    userRegisterTrigger: trigger,
    userRegisterResult: result,
    userRegisterLoading: loading,
    userRegisterError: error,
  };
};
