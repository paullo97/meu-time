import { NgModule } from '@angular/core';
import { StoreModule } from './store/store.module';
import { EffectsModule } from './effects/effects.module';
import { ServicesModule } from './services/service.module';
import { InterceptorsModule } from './interceptor/interceptor.module';

@NgModule({
    imports: [
        StoreModule,
        EffectsModule,
        ServicesModule,
        InterceptorsModule
    ]
})
export class CoreModule
{ }