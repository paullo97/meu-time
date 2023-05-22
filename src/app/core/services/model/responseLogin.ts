import { IResponse } from "./response.model";


export interface ResponseStatus extends IResponse
{
    response: Response;
}

export interface Response {
    account: Account;
    subscription: Subscription;
    requests: Requests;
}

export interface Account {
    firstname: string;
    lastname: string;
    email: string;
}

export interface Subscription {
    plan: string;
    end: string;
    active: boolean;
}

export interface Requests {
    current: number;
    limit_day: number;
}
