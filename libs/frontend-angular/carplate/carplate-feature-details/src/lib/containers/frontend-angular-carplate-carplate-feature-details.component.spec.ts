import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { DynamicModalService } from '@frontend-angular/shared/ui/modal';
import { FrontendAngularCarplateCarplateFeatureDetailsComponent } from './frontend-angular-carplate-carplate-feature-details.component';
import { MAX_OWNER_LENGTH, MIN_OWNER_LENGTH } from '../..';

describe('FrontendAngularCarplateCarplateFeatureDetailsComponent', () => {
  let component: FrontendAngularCarplateCarplateFeatureDetailsComponent;
  let fixture: ComponentFixture<FrontendAngularCarplateCarplateFeatureDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontendAngularCarplateCarplateFeatureDetailsComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') {
                    return 'mocked-id';
                  }
                  return null;
                },
              },
              queryParams: {},
            },
          },
        },
        {
          provide: CarplateFacade,
          useValue: {
            isLoading$: of(false),
            isLoaded$: of(true),
            saved$: of(false),
            errors$: of(null),
            selectedCarplate: of(null),
            selectCarplateById: (id: string) => of(null),
            createCarplate: () => jest.fn(),
            updateCarplate: () => jest.fn(),
            fetchOneCarplate: () => jest.fn(),
            clearErrors: () => jest.fn(),
          },
        },
        { provide: DynamicModalService, useValue: { open: () => jest.fn() } },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FrontendAngularCarplateCarplateFeatureDetailsComponent
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

    it('clear errors on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component['facade'], 'clearErrors');

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    describe('validate', () => {
      describe('owner', () => {
        const ownerValidationCases = [
          { description: 'cannot be null', value: null, valid: false },
          {
            description: 'cannot contains numbers',
            value: 'alanas2',
            valid: false,
          },
          {
            description: 'cannot contains special symbols',
            value: 'alanas#',
            valid: false,
          },
          {
            description: `minimum ${MIN_OWNER_LENGTH} symbols`,
            value: 'al',
            valid: false,
          },
          {
            description: `maximum ${MAX_OWNER_LENGTH} symbols`,
            value: 'alalalalalalalalalalalalalalalalala',
            valid: false,
          },
          {
            description: `minimum ${MIN_OWNER_LENGTH} symbols and maximum ${MAX_OWNER_LENGTH}`,
            value: 'alanas',
            valid: true,
          },
        ];

        ownerValidationCases.forEach((test) => {
          it(`${test.description}: ${test.value} - valid: ${test.valid}`, () => {
            const ownerControl = component.carplateForm.get('owner');
            ownerControl?.patchValue(test.value);
            fixture.detectChanges();
            expect(ownerControl?.valid).toBe(test.valid);
          });
        });
      });

      describe('plate_name', () => {
        const plateNameValidationCases = [
          { description: 'cannot be null', value: null, valid: false },
          {
            description: 'cannot contain special symbols',
            value: 'abc12#',
            valid: false,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc123',
            valid: true,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc12',
            valid: false,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc1232',
            valid: false,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'ABC123',
            valid: true,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'AB1123',
            valid: false,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'ABAA23',
            valid: false,
          },
        ];

        plateNameValidationCases.forEach((test) => {
          it(`${test.description}: ${test.value} - valid: ${test.valid}`, () => {
            const plateNameControl = component.carplateForm.get('plate_name');
            plateNameControl?.patchValue(test.value);
            fixture.detectChanges();
            expect(plateNameControl?.valid).toBe(test.valid);
          });
        });
      });
    });
  });
});
