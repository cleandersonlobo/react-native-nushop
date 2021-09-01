import { useRoute } from '@react-navigation/core';

export function useRouteParams<T>(): T {
  const { params = {} } = useRoute();
  return params as unknown as T;
}
