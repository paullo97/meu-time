import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule as NGEffectsModule, EffectsRootModule } from '@ngrx/effects';
import { LoginEffect } from './login.effect';
import { DashboardEffect } from './dashboard.effect';

const effects: ModuleWithProviders<EffectsRootModule> = NGEffectsModule.forRoot([
    LoginEffect,
    DashboardEffect
]);

@NgModule({
    imports: [ effects ]
})
export class EffectsModule
{ }