import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
type AuthState = { isAuthenticated: boolean; sub: string; roles: string[] };
export const AuthStore = signalStore(
  withState<AuthState>({
    isAuthenticated: false,
    sub: '',
    roles: [],
  }),
  withMethods((store) => {
    return {
      logIn: (sub: string, roles: string[]) =>
        patchState(store, { isAuthenticated: true, sub, roles }),
      logOut: () => patchState(store, { isAuthenticated: false, sub: '' }),
    };
  }),
);
