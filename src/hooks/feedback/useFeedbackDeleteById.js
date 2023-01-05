import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as servicesQuery } from './useServices';

const query = `
  feedbackDeleteById($id: String!) {
    feedbackDeleteById(id: $id) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'feedbackDeleteById',
    refetchQuery: servicesQuery,
  });

  return {
    feedbackDeleteByIdTrigger: trigger,
    feedbackDeleteByIdResult: result,
    feedbackDeleteByIdLoading: loading,
    feedbackDeleteByIdError: error,
  };
};
