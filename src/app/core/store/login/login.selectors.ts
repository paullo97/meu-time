import { LoginStore } from './login.store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getLoginState = createFeatureSelector<LoginStore>('login');

export const getLoadingLogin = createSelector(
    getLoginState,
    (store: LoginStore) => store.loading
);

export const getKeyValidated = createSelector(
    getLoginState,
    (store: LoginStore) => store.keyValid
);

export const getKey = createSelector(
    getLoginState,
    (store: LoginStore)  => store.key
);