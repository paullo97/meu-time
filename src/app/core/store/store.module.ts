import { NgModule } from '@angular/core';
import { StoreModule as NgStoreModule } from '@ngrx/store';
import { storeTools } from 'src/environments/constants';
import { reducers } from './store';

@NgModule({
  imports: [
    NgStoreModule.forRoot(reducers),
    ...storeTools
  ]
})
export class StoreModule
{ }