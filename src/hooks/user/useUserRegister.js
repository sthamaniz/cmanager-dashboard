import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  UserRegister($email: String!, $password: String!, $firstName: String!, $lastName: String!, $gender: UserGender!, $mobile: String!, $address: String, $source: UserSource, $role: UserRole!, $australianBusinessNumber: Int, $taxFileNumber: Int, $idType: UserIdType, $idNumber: Int, $status: Status!) {
    userRegister(email: $email, password: $password, firstName: $firstName, lastName: $lastName, gender: $gender, mobile: $mobile, address: $address, source: $source, role: $role, australianBusinessNumber: $australianBusinessNumber, taxFileNumber: $taxFileNumber, idType: $idType, idNumber: $idNumber, status: $status) {
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
