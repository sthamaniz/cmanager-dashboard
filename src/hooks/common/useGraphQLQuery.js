import { useState } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';

import { authHeader } from 'utils/util';
import { getValueOf, STORAGE_KEYS } from 'services/storage';

export default ({
  query,
  withSubscription,
  key,
  variables,
  fetchPolicy,
  onComplete,
}) => {
  const token = getValueOf(STORAGE_KEYS.ACCESS_TOKEN);

  const [result, setResult] = useState(null);

  const onDataReceive = (data) => {
    let result = null;

    if (data && data[key]) {
      result = data[key];
    } else if (
      data &&
      data.subscriptionData &&
      data.subscriptionData.data[key]
    ) {
      result = data.subscriptionData.data[key];
    }

    setResult(result);

    if (onComplete) {
      onComplete(result);
    }
  };

  let { loading, error } = useQuery(gql`query ${query}`, {
    fetchPolicy,
    variables,
    ...authHeader(token),
    onCompleted: onDataReceive,
    errorPolicy: 'all',
  });

  if (withSubscription) {
    useSubscription(gql`subscription ${query}`, {
      variables,
      ...authHeader(token),
      onSubscriptionData: onDataReceive,
    });
  }

  return { result, loading, error };
};
