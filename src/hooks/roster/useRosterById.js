import useGraphQLQuery from 'hooks/common/useGraphQLQuery';

export const query = `
  RosterById($id: String!) {
    rosterById(id: $id) {
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
`;

export default (id) => {
  const { result, loading, error } = useGraphQLQuery({
    query,
    key: 'rosterById',
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    rosterByIdResult: result,
    rosterByIdLoading: loading,
    rosterByIdError: error,
  };
};
