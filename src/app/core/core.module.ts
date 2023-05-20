import { NgModule } from '@angular/core';
import { StoreModule } from './store/store.module';
import { EffectsModule } from './effects/effects.module';
import { ServicesModule } from './services/service.module';

@NgModule({
    imports: [
        StoreModule,
        EffectsModule,
        ServicesModule
    ]
})
export class CoreModule
{ }