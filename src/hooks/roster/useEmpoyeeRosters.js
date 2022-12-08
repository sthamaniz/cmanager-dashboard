import useGraphQLLazyQuery from 'hooks/common/useGraphQLLazyQuery';

const query = `
  EmployeeRosters($startDate: String, $endDate: String) {
    employeeRosters(startDate: $startDate, endDate: $endDate) {
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

export default () => {
  const { trigger, result, loading, error } = useGraphQLLazyQuery({
    query,
    key: 'employeeRosters',
    fetchPolicy: 'cache-and-network',
  });

  return {
    employeeRostersTrigger: trigger,
    employeeRostersResult: result,
    employeeRostersLoading: loading,
    employeeRostersError: error,
  };
};
