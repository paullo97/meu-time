import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { LoginStore } from "../store/login/login.store";
import { getKey } from "../store/login/login.selectors";

@Injectable()
export class SessionInterceptor implements HttpInterceptor
{
    constructor(
        private readonly store: Store<LoginStore>
    )
    { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let key: string = '';
        this.store.select(getKey).pipe(take(1)).subscribe((data) => key = data);

        let headers = new HttpHeaders({'x-rapidapi-key': key, 'x-rapidapi-host':'v3.football.api-sports.io' });
        
        return next.handle(req.clone({
            url: req.url,
            headers
        }))
    }
}