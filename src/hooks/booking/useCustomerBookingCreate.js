import useGraphQLMutation from 'hooks/common/useGraphQLMutation';

const query = `
  CustomerBookingCreate($service: String!, $type: BookingType!, $startDate: String!, $frequency: BookingFrequency!, $days: [String!]!, $arrivalTime: String!, $note: String) {
    customerBookingCreate(service: $service, type: $type, startDate: $startDate, frequency: $frequency, days: $days, arrivalTime: $arrivalTime, note: $note) {
      _id
    }
  }
`;

export default () => {
  const { trigger, result, loading, error } = useGraphQLMutation({
    query,
    key: 'customerBookingCreate',
  });

  return {
    customerBookingCreateTrigger: trigger,
    customerBookingCreateResult: result,
    customerBookingCreateLoading: loading,
    customerBookingCreateError: error,
  };
};
