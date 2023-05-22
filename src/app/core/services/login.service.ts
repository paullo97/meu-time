import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ResponseStatus } from './model/responseLogin';

@Injectable()
export class LoginService
{
    constructor(
        private readonly http: HttpClient
    )
    { }

    public verifyKeyStatus(key: string): Observable<any>
    {
        const headerDict = {
            'x-rapidapi-key': key,
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }

        return this.http.get('https://v3.football.api-sports.io/status', {
            headers: headerDict
        });
    }
}