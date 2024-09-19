import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { DynamicModalService } from '@frontend-angular/shared/ui/modal';
import { FrontendAngularCarplateCarplateFeatureCarplateListComponent } from './frontend-angular-carplate-carplate-feature-carplate-list.component';

describe('FrontendAngularCarplateCarplateFeatureCarplateListComponent', () => {
  let component: FrontendAngularCarplateCarplateFeatureCarplateListComponent;
  let fixture: ComponentFixture<FrontendAngularCarplateCarplateFeatureCarplateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrontendAngularCarplateCarplateFeatureCarplateListComponent,
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
            },
          },
        },
        {
          provide: CarplateFacade,
          useValue: {
            pagination$: of({}),
            carplatesList$: of([]),
            isLoading$: of(false),
            isLoaded$: of(true),
            fetchAllCarplates: () => jest.fn(),
            deleteCarplate: () => jest.fn(),
          },
        },
        { provide: DynamicModalService, useValue: { open: () => jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FrontendAngularCarplateCarplateFeatureCarplateListComponent
    );
    component = fixture.componentInstance;
  });

  describe('should', () => {
    it('be created', () => {
      expect(component).toBeTruthy();
    });

    it('unsubscribe on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component['subs$'], 'unsubscribe');

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
