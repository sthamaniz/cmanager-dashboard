import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

const query = `
  BookingById($id: String!) {
    bookingById(id: $id) {
      _id
      customer {
        _id
        firstName
        lastName
        mobile
        address
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

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'bookingById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    bookingByIdResult: result,
    bookingByIdLoading: loading,
    bookingByIdError: error,
  };
};
