import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { API_URL, BASE_API_TOKEN } from '@shared/common/constants';

import { CarplateService } from './frontend-angular-carplate-carplate.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [CarplateService, { provide: BASE_API_TOKEN, useValue: API_URL }],
})
export class FrontendAngularCarplateCarplateDataAccessModule {}
