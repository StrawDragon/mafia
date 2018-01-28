import deepMerge from 'deepmerge';
import { MiddlewareAPI, Reducer } from 'redux';
import reducer, { RootState } from '../reducer/root';

// TODO need to improve
type PartialDeep<T> = Partial<{
  [ P in keyof T ]: PartialDeep<T[ P ]>;
}>;

export const mockStore = (statePatch: PartialDeep<RootState>): MiddlewareAPI<RootState> => ({
  // tslint:disable-next-line
  dispatch: (a: any) => a,
  getState: () => mockState(reducer, statePatch) as any
});

export const mockState = <T>(reducer: Reducer<T>, statePatch: PartialDeep<T>): any => deepMerge(
    // tslint:disable-next-line
    reducer((undefined as any), { type: '@@INITIAL' }),
    statePatch,
  // tslint:disable-next-line
  ) as any;

