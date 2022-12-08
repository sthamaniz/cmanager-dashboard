import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  BookingUpdateById($id: String!, $customer: String!, $service: String!, $type: BookingType!, $priceType: BookingPriceType!, $startDate: String!, $frequency: BookingFrequency!, $days: [String!]!, $arrivalTime: String!, $assignedEmployees: [AssignedEmployeesInput!]! $note: String, $status: String!) {
    bookingUpdateById(id: $id, customer: $customer, service: $service, type: $type, priceType: $priceType, startDate: $startDate, frequency: $frequency, days: $days, arrivalTime: $arrivalTime, assignedEmployees: $assignedEmployees, note: $note, status: $status) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'bookingUpdateById',
  });

  return {
    bookingUpdateByIdTrigger: trigger,
    bookingUpdateByIdResult: result,
    bookingUpdateByIdLoading: loading,
    bookingUpdateByIdError: error,
  };
};
