import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  ServiceCreate($title: String!, $description: String!, $status: Status!) {
    serviceCreate(title: $title, description: $description, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'serviceCreate',
  });

  return {
    serviceCreateTrigger: trigger,
    serviceCreateResult: result,
    serviceCreateLoading: loading,
    serviceCreateError: error,
  };
};
