import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

import { query as bookingsQuery } from './useBookings';

const query = `
  BookingDeleteById($id: String!) {
    bookingDeleteById(id: $id) {
      _id
    }
  }
`;

export default ({ refetchVariables }) => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'bookingDeleteById',
    refetchQuery: bookingsQuery,
    refetchVariables: refetchVariables || {},
  });

  return {
    bookingDeleteByIdTrigger: trigger,
    bookingDeleteByIdResult: result,
    bookingDeleteByIdLoading: loading,
    bookingDeleteByIdError: error,
  };
};
