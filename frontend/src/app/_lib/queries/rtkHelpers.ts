import { Result } from '../types/common.types';

export const transformToRTKResult = <T>(result: Result<T>) => {
  return result.success ? { data: result.data } : { error: result.errors };
};
