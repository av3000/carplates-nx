import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DebugElement,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { of } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import {
  DynamicModalService,
  Options,
} from '@frontend-angular/shared/ui/modal';
import { defaultSmallModalOptions } from '@shared/common/constants';
import { FrontendAngularCarplateCarplateFeatureDetailsComponent } from './frontend-angular-carplate-carplate-feature-details.component';
import { MAX_OWNER_LENGTH, MIN_OWNER_LENGTH, textFields } from '../..';

describe('FrontendAngularCarplateCarplateFeatureDetailsComponent', () => {
  let component: FrontendAngularCarplateCarplateFeatureDetailsComponent;
  let fixture: ComponentFixture<FrontendAngularCarplateCarplateFeatureDetailsComponent>;
  let mockModalService: Partial<jest.Mocked<DynamicModalService>>;
  let de: DebugElement;

  beforeEach(() => {
    mockModalService = {
      open: jest.fn().mockImplementation(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          vcrOrComponent: ViewContainerRef | Type<any>,
          param2?: TemplateRef<Element> | Options,
          options?: Options
        ) => {
          if (
            vcrOrComponent instanceof ViewContainerRef &&
            param2 instanceof TemplateRef
          ) {
            // ViewContainerRef and TemplateRef are passed
            vcrOrComponent.createEmbeddedView(param2); // Mock creation template view
          } else if (typeof vcrOrComponent === 'function') {
            // Component is passed
            // No need to mock, just know it was called
          }
          // Save options to mock the options handling behavior
          mockModalService.options = options || (param2 as Options);
        }
      ),
      close: jest.fn(),
    } as Partial<jest.Mocked<DynamicModalService>>;

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
            selectCarplateById: () => of(null),
            createCarplate: () => jest.fn(),
            updateCarplate: () => jest.fn(),
            fetchOneCarplate: () => jest.fn(),
            clearErrors: () => jest.fn(),
          },
        },
        {
          provide: DynamicModalService,
          useValue: mockModalService,
        },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FrontendAngularCarplateCarplateFeatureDetailsComponent
    );
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  describe('should', () => {
    it('be created', () => {
      expect(component).toBeTruthy();
    });

    it('should open the modal on initialization', () => {
      // GIVEN
      const containerDiv = de.query(By.css('.container'));
      console.log('');
      const header = de.query(By.css('.header')).nativeElement.innerHTML;
      // WHEN
      fixture.detectChanges();
      // THEN
      expect(mockModalService.open).toHaveBeenCalledTimes(1);
      expect(mockModalService.open).toHaveBeenCalledWith(
        component.vcr,
        component.modalTemplate,
        expect.objectContaining({
          ...defaultSmallModalOptions,
        })
      );
      expect(containerDiv).not.toBeNull();
      expect(header).not.toBeNull(); // The ng-template content should now be in the DOM
    });

    it('cleanup the component on destroy', () => {
      // GIVEN
      const unsubscribeSpy = jest.spyOn(component['subs$'], 'unsubscribe');
      const clearErrSpy = jest.spyOn(component['facade'], 'clearErrors');
      // WHEN
      component.ngOnDestroy();
      // THEN
      expect(unsubscribeSpy).toHaveBeenCalled();
      expect(clearErrSpy).toHaveBeenCalled();
    });

    describe('validate', () => {
      describe('owner', () => {
        const ownerValidationCases = [
          {
            description: 'cannot contain numbers',
            value: 'alanas2',
            valid: false,
            errorTest: textFields.owner.errors.pattern,
          },
          {
            description: 'cannot contain special symbols',
            value: 'alanas#',
            valid: false,
            errorTest: textFields.owner.errors.pattern,
          },
          {
            description: `minimum ${MIN_OWNER_LENGTH} symbols`,
            value: 'al',
            valid: false,
            errorTest: textFields.owner.errors.minLength,
          },
          {
            description: `minimum ${MIN_OWNER_LENGTH} symbols and maximum ${MAX_OWNER_LENGTH}`,
            value: 'alanas',
            valid: true,
            errorTest: null,
          },
        ];

        ownerValidationCases.forEach((test) => {
          it(`${test.description}: ${test.value} - valid: ${test.valid}`, () => {
            const ownerControl = component.carplateForm.get('owner');
            ownerControl?.patchValue(test.value);
            ownerControl?.markAsDirty();
            fixture.detectChanges();
            expect(ownerControl?.valid).toBe(test.valid);
          });

          it(`should ${test.valid ? '' : 'not'} render error message for '${
            test.description
          }'`, () => {
            const ownerControl = component.carplateForm.get('owner');
            ownerControl?.patchValue(test.value);
            ownerControl?.markAsDirty();
            fixture.detectChanges();

            if (ownerControl?.errors && !test.valid) {
              const renderedErrHint = de.query(
                By.css(`[data-testid="${test.errorTest?.errorTestId}"]`)
              ).nativeElement.textContent;
              expect(renderedErrHint.trim()).toBe(test.errorTest?.errorMessage);
            }
          });
        });
      });

      describe('plate_name', () => {
        const plateNameValidationCases = [
          {
            description: 'cannot contain special symbols',
            value: 'abc12#',
            valid: false,
            errorTest: textFields.plateName.errors.pattern,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc123',
            valid: true,
            errorTest: null,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc12',
            valid: false,
            errorTest: textFields.plateName.errors.pattern,
          },
          {
            description: `must be 6 symbols length`,
            value: 'abc1232',
            valid: false,
            errorTest: textFields.plateName.errors.pattern,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'ABC123',
            valid: true,
            errorTest: null,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'AB1123',
            valid: false,
            errorTest: textFields.plateName.errors.pattern,
          },
          {
            description: `first 3 symbols must be letters and remaining 3 symbols numbers`,
            value: 'ABAA23',
            valid: false,
            errorTest: textFields.plateName.errors.pattern,
          },
        ];

        plateNameValidationCases.forEach((test) => {
          it(`${test.description}: ${test.value} - valid: ${test.valid}`, () => {
            // GIVEN
            const plateNameControl = component.carplateForm.get('plate_name');
            plateNameControl?.patchValue(test.value);
            plateNameControl?.markAsDirty();
            // WHEN
            fixture.detectChanges();
            // THEN
            expect(plateNameControl?.valid).toBe(test.valid);
          });

          it(`should ${test.valid ? '' : 'not'} render error message for '${
            test.description
          }'`, () => {
            // GIVEN
            const plateNameControl = component.carplateForm.get('plate_name');
            plateNameControl?.patchValue(test.value);
            plateNameControl?.markAsDirty();
            // WHEN
            fixture.detectChanges();

            if (plateNameControl?.errors && !test.valid) {
              const renderedErrHint = de.query(
                By.css(`[data-testid="${test.errorTest?.errorTestId}"]`)
              );
              const renderedErrHintTextMessage =
                renderedErrHint.nativeElement.textContent.trim();
              // THEN
              expect(renderedErrHintTextMessage).toBe(
                test.errorTest?.errorMessage
              );
            }
          });
        });
      });
    });
  });
});
