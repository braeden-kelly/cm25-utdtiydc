import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
type AuthState = { isAuthenticated: boolean; sub: string };
export const AuthStore = signalStore(
  withState<AuthState>({
    isAuthenticated: false,
    sub: '',
  }),
  withMethods((store) => {
    return {
      logIn: (sub: string) => patchState(store, { isAuthenticated: true, sub }),
      logOut: () => patchState(store, { isAuthenticated: false, sub: '' }),
    };
  }),
);
