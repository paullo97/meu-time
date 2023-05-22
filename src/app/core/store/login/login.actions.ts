import { ErrorPayload } from "../../services/model/error.model";
import { storeTag } from "./login.store";

import { createAction, props } from '@ngrx/store';

export const verifyKey = createAction(
    `${storeTag} Verify Key`,
    props<{
        key: string;
    }>()
);
export const verifyKeySuccess = createAction(
    `${storeTag} Verify Key Success`
);
export const verifyKeyError = createAction(
    `${storeTag} Verify Key Error`,
    props<{
        error: ErrorPayload;
    }>()
);

export const logout = createAction(
    `${storeTag} Logout System`
);