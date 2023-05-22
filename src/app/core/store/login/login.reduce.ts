import { logout, verifyKey, verifyKeyError, verifyKeySuccess } from "./login.actions";
import { LoginStore } from "./login.store";
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

export const initialState: Partial<LoginStore> = {
    loading: false,
    error: undefined,
    keyValid: false,
    key: undefined
};

const reducer: ActionReducer<Partial<LoginStore>, Action> = createReducer(
    initialState,
    on(verifyKey, (state, action) => ({
        ...state,
        loading: true,
        error: undefined,
        key: action.key
    })),
    on(verifyKeySuccess, (state) => ({
        ...state,
        loading: false,
        keyValid: true
    })),
    on(verifyKeyError, (state, action) => ({
        ...state,
        loading: false,
        error: action.error,
        keyValid: false,
        key: undefined
    })),
    on(logout, (state) => ({
        ...state,
        keyValid: false,
        key: undefined
    }))
);

export function loginReducer(
    state: Partial<LoginStore> = initialState,
    action: Action
): Partial<LoginStore>
{
    return reducer(state, action);
}