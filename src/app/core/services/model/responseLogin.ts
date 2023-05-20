export interface ResponseStatus {
    get: string;
    parameters: Array<any>;
    errors: any;
    results: number;
    paging: Paging;
    response: Response;
}

export interface Paging {
    current: number;
    total: number;
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
