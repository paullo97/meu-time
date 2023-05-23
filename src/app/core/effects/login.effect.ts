import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { logout, verifyKey, verifyKeyError, verifyKeySuccess } from '../store/login/login.actions';
import { ResponseStatus } from '../services/model/responseLogin';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect
{
    getStatus$ = createEffect(() => this.actions$.pipe(
        ofType(verifyKey),
        switchMap(() => this.loginService.verifyKeyStatus()),
        map((response: ResponseStatus) =>
        {
            if(!!response.errors.token)
            {
                this._snackBar.open('A Key é invalida, por favor revise-a', 'OK', {
                    duration: 1500
                });
                return verifyKeyError({ error: { message: 'Key Invalida' } });
            }

            this._snackBar.open('Key Valida, você será redirecionado para o Dashboard', 'OK', {
                duration: 1500
            });
            return verifyKeySuccess();
        }),
        catchError(() => EMPTY)
    ));

    changeRoute$ = createEffect(() => this.actions$.pipe(
        ofType(verifyKeySuccess),
        map(() =>
        {
            setTimeout(() =>
            {
                this.router.navigateByUrl('/dashboard');
            }, 2000)
        })
    ), {dispatch: false });

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logout),
        map(() =>
        {
            this.router.navigateByUrl('/');
            this._snackBar.open('Logout Efetuado com Sucesso', undefined, {
                duration: 1500
            });
        })
    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly _snackBar: MatSnackBar,
        private readonly loginService: LoginService,
        private readonly router: Router
    )
    { }
}