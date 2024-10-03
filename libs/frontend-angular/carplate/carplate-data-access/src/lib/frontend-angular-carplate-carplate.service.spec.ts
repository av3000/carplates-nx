import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BASE_API_TOKEN } from '@carplates/frontend-angular/shared/config';

import { CarplateService } from './frontend-angular-carplate-carplate.service';

describe('CarplateService', () => {
  let service: CarplateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CarplateService,
        { provide: BASE_API_TOKEN, useValue: BASE_API_TOKEN },
      ],
    });

    service = TestBed.inject(CarplateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create carplate service', () => {
    expect(service).toBeTruthy();
  });
});
