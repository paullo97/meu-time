import { ModuleWithProviders } from "@angular/core";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MonoTypeOperatorFunction, filter } from "rxjs";

/** Usage to Enable DevTools to see Store Redux */
export const storeTools: Array<ModuleWithProviders<any>> = [
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        name: 'Meu Time'
    })
  ];

export const urlBase = 'https://v3.football.api-sports.io';

export const notNullPipe: MonoTypeOperatorFunction<any> = filter((data: any) => !!data);