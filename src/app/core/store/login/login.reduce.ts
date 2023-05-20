import { verifyKey, verifyKeyError, verifyKeySuccess } from "./login.actions";
import { LoginStore } from "./login.store";
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

export const initialState: Partial<LoginStore> = {
    loading: false,
    error: undefined,
    keyValid: false
};

const reducer: ActionReducer<Partial<LoginStore>, Action> = createReducer(
    initialState,
    on(verifyKey, (state) => ({
        ...state,
        loading: true,
        error: undefined
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
        keyValid: false
    }))
);

export function loginReducer(
    state: Partial<LoginStore> = initialState,
    action: Action
): Partial<LoginStore>
{
    return reducer(state, action);
}