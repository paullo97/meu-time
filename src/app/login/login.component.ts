import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginStore } from '../core/store/login/login.store';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { verifyKey } from '../core/store/login/login.actions';
import { Observable, Subscription, of, take } from 'rxjs';
import { getKeyValidated, getLoadingLogin } from '../core/store/login/login.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  public key: string = 'ca4ea7ee8bc6df7f82c6cddfb827e20b';
  public loading$: Observable<boolean> = this.loginStore.select(getLoadingLogin);
  public keyValidated$: Observable<boolean> = this.loginStore.select(getKeyValidated);

  public sub: Subscription = new Subscription();

  constructor(
    private readonly loginStore: Store<LoginStore>,
    private _snackBar: MatSnackBar,
    private readonly router: Router
  )
  { }

  public ngOnInit(): void {
    this.sub.add(
      this.keyValidated$.pipe(take(1)).subscribe((data) => {
        if (data) {
          this.router.navigateByUrl('/dashboard');
        }
      }));
  }

  public verifyKey(): void {
    if (this.key.trim().length === 0 || this.key.length < 32) {
      this._snackBar.open('Fill in the Key correctly', 'OK', {
        duration: 1500
      });
      return;
    }

    this.loginStore.dispatch(verifyKey({ key: this.key }));
  }
}
