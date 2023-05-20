import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule as NGEffectsModule, EffectsRootModule } from '@ngrx/effects';
import { LoginEffect } from './login.effect';

const effects: ModuleWithProviders<EffectsRootModule> = NGEffectsModule.forRoot([
    LoginEffect
]);

@NgModule({
    imports: [ effects ]
})
export class EffectsModule
{ }