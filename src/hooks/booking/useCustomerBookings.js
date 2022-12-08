import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

const query = `
  CustomerBookings ($status: String) {
    customerBookings (status: $status) {
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
    key: 'customerBookings',
    fetchPolicy: 'cache-and-network',
  });

  return {
    customerBookingsTrigger: trigger,
    customerBookingsResult: result,
    customerBookingsLoading: loading,
    customerBookingsError: error,
  };
};
