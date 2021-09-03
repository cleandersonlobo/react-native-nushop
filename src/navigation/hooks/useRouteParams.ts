import { useRoute } from '@react-navigation/native';

export function useRouteParams<T>(): T {
  const { params = {} } = useRoute();
  return params as unknown as T;
}
