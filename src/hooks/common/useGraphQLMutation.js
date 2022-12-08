import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import { authHeader } from 'utils/util';
import { getValueOf, STORAGE_KEYS } from 'services/storage';

export default ({
  query,
  key,
  onComplete,
  refetchQuery,
  refetchVariables,
}) => {
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

  const [mutationFunction, { loading, error }] = useMutation(
    gql`mutation ${query}`,
    {
      ...authHeader(token),
      onCompleted: onDataReceive,
      errorPolicy: 'all',
      refetchQueries: refetchQuery
        ? [
            {
              query: gql`query ${refetchQuery}`,
              variables: refetchVariables || {},
              ...authHeader(token),
              errorPolicy: 'all',
            },
          ]
        : [],
    },
  );

  const trigger = (variables) => mutationFunction({ variables });

  return { trigger, result, loading, error };
};
