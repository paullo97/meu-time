export interface IResponse {
    get: string;
    parameters: Array<any>;
    errors: any;
    results: number;
    paging: Paging;
}

export interface Paging {
    current: number;
    total: number;
}