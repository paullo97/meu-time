import { ErrorPayload } from "../../services/model/error.model";

export const storeTag: string = '[Login Store]';

export interface LoginStore
{
    response: any; //FIX
    keyValid: boolean;
    key: string;
    loading: boolean;
    error: ErrorPayload;
}