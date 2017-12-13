export interface ChargedAction<P> {
  type: string;
  payload: P;
}

export interface SimpleAction {
  type: string;
}

export type Action<P> = ChargedAction<P> & SimpleAction;
