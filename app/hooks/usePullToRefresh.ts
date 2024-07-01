import { useState, useCallback } from 'react';

export const usePullToRefresh = (refreshFunction: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshFunction();
    setRefreshing(false);
  }, [refreshFunction]);

  return { refreshing, onRefresh };
};
