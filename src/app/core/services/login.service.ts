import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ResponseStatus } from './model/responseLogin';
import { urlBase } from 'src/environments/constants';

@Injectable()
export class LoginService
{
    constructor(
        private readonly http: HttpClient
    )
    { }

    public verifyKeyStatus(): Observable<any>
    {
        return this.http.get(`${urlBase}/status`);
    }
}