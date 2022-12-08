import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { authHeader } from 'utils/util';
import { getValueOf, STORAGE_KEYS } from 'services/storage';

export default ({ query, key, fetchPolicy, onComplete }) => {
  const token = getValueOf(STORAGE_KEYS.ACCESS_TOKEN);

  const [result, setResult] = useState(null);

  const onDataReceive = (data) => {
    let result = null;

    if (data && data[key]) {
      result = data[key];
    }

    setResult(result);

    if (onComplete) {
      onComplete(result);
    }
  };

  const [queryFunction, { loading, error }] = useLazyQuery(
    gql`query ${query}`,
    {
      fetchPolicy,
      ...authHeader(token),
      onCompleted: onDataReceive,
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: 'true',
    },
  );

  const trigger = (variables) => queryFunction({ variables });

  return { trigger, result, loading, error };
};
