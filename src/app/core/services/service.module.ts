import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { DashboardService } from './dashboard.service';


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        LoginService,
        DashboardService
    ]
})
export class ServicesModule
{ }