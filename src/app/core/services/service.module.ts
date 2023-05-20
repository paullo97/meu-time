import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoginService
    ]
})
export class ServicesModule
{ }