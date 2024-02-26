import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CarplateService } from './frontend-angular-carplate-carplate.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [CarplateService],
})
export class FrontendAngularCarplateCarplateDataAccessModule {}
