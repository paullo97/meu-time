import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SessionInterceptor } from './session.interceptor';

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true }
    ]
})
export class InterceptorsModule
{ }