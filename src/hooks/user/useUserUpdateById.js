import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  UserUpdateById($id: String!, $firstName: String, $lastName: String, $gender: UserGender, $mobile: String, $address: String, $source: UserSource, $hours: Int, $status: Status) {
    userUpdateById(id: $id, firstName: $firstName, lastName: $lastName, gender: $gender, mobile: $mobile, address: $address, source: $source, hours: $hours, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'userUpdateById',
  });

  return {
    userUpdateByIdTrigger: trigger,
    userUpdateByIdResult: result,
    userUpdateByIdLoading: loading,
    userUpdateByIdError: error,
  };
};