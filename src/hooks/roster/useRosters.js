import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

export const query = `
  Rosters($startDate: String, $endDate: String) {
    rosters(startDate: $startDate, endDate: $endDate) {
      date
      rosters {
        _id
        booking {
          _id
          customer {
            _id
            firstName
            lastName
            mobile
            address
            source
            hours
          }
          service {
            _id
            title
          }
          startDate
          frequency
          arrivalTime
          assignedEmployees {
            employee {
              _id
              firstName
              lastName
            }
          }
          note
        }
        date
      }
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'rosters',
    fetchPolicy: 'cache-and-network',
  });

  return {
    rostersTrigger: trigger,
    rostersResult: result,
    rostersLoading: loading,
    rostersError: error,
  };
};
