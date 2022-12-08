import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Bookings($status: BookingStatus) {
    bookings(status: $status) {
      _id
      customer {
        _id
        firstName
        lastName
      }
      service {
        _id
        title
      }
      type
      priceType
      startDate
      frequency
      days
      arrivalTime
      assignedEmployees {
        employee {
          _id
          firstName
          lastName
          mobile
          address
        }
        hour
      }
      note
      status
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'bookings',
    fetchPolicy: 'cache-and-network',
  });

  return {
    bookingsTrigger: trigger,
    bookingsResult: result,
    bookingsLoading: loading,
    bookingsError: error,
  };
};
