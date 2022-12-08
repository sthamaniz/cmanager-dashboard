import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  serviceUpdateById($id: String!, $title: String, $description: String, $status: Status) {
    serviceUpdateById(id: $id, title: $title, description: $description, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'serviceUpdateById',
  });

  return {
    serviceUpdateByIdTrigger: trigger,
    serviceUpdateByIdResult: result,
    serviceUpdateByIdLoading: loading,
    serviceUpdateByIdError: error,
  };
};
