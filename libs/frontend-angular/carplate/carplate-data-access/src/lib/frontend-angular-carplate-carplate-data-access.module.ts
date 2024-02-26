import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { API_URL, BASE_API_TOKEN } from '@shared/common/constants';

import { CarplateService } from './frontend-angular-carplate-carplate.service';
import { carplateReducer } from './+store/reducer/frontend-angular-carplate-carplate.reducer';
import { CarplateEffects } from './+store/effects/frontend-angular-carplate-carplate.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('carplate', carplateReducer),
    EffectsModule.forFeature([CarplateEffects]),
  ],
  providers: [CarplateService, { provide: BASE_API_TOKEN, useValue: API_URL }],
})
export class FrontendAngularCarplateCarplateDataAccessModule {}
