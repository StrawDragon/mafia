import deepMerge from 'deepmerge';
import { MiddlewareAPI } from 'redux';
import reducer, { RootState } from '../reducer/root';

// TODO need to improve
type PartialDeep<T> = Partial<{
  [ P in keyof T ]: PartialDeep<T[ P ]>;
}>;

export const mockStore = (statePath: PartialDeep<RootState>): MiddlewareAPI<RootState> => ({
  // tslint:disable-next-line
  dispatch: (a: any) => a,
  getState: () => deepMerge(
    // tslint:disable-next-line
    reducer((undefined as any), { type: '@@INITIAL' }),
    statePath,
  // tslint:disable-next-line
  ) as any,
});