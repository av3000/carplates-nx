import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Subscription,
  combineLatest,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { DynamicModalService } from '@frontend-angular/shared/ui/modal';
import { Validators as CarplateValidators } from '@shared/common/utils';
import { defaultSmallModalOptions } from '@shared/common/constants';
import { MAX_OWNER_LENGTH, MIN_OWNER_LENGTH, textFields } from '../..';

@Component({
  selector: 'carplates-frontend-angular-carplate-carplate-feature-details',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendAngularCarplateCarplateFeatureDetailsComponent
  implements OnInit, OnDestroy
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('view', { static: true }) modalTemplate!: TemplateRef<any>;
  @ViewChild('view', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  MAX_OWNER_LENGTH = MAX_OWNER_LENGTH;
  MIN_OWNER_LENGTH = MIN_OWNER_LENGTH;
  textFields = textFields;

  private subs$ = new Subscription();
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;
  error$ = this.facade.errors$;
  carplateForm = this.formBuilder.group({
    plate_name: [
      '',
      [
        Validators.required,
        Validators.pattern(CarplateValidators.plateFormatPattern),
      ],
    ],
    owner: [
      '',
      [
        Validators.required,
        Validators.minLength(MIN_OWNER_LENGTH),
        Validators.maxLength(MAX_OWNER_LENGTH),
        Validators.pattern(CarplateValidators.ownerFormatPattern),
      ],
    ],
    createdAt: [''],
    updatedAt: [''],
  });

  valueChanged = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentCarplate!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dynamicModalService: DynamicModalService,
    private facade: CarplateFacade,
    private formBuilder: FormBuilder
  ) {}

  get id(): string | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id && id !== 'new' ? id : null;
  }

  get isNew(): boolean {
    return !this.id;
  }

  get isFormSaveable(): boolean {
    return (
      (!this.carplateForm.invalid && this.valueChanged) ||
      (this.isNew && !this.carplateForm.invalid)
    );
  }

  get createdAtValue(): string {
    return this.carplateForm.get('createdAt')?.value || '';
  }

  get updatedAtValue(): string {
    return this.carplateForm.get('updatedAt')?.value || '';
  }

  get plateNameControl(): FormControl {
    return this.carplateForm.get('plate_name') as FormControl;
  }

  get ownerControl(): FormControl {
    return this.carplateForm.get('owner') as FormControl;
  }

  ngOnInit() {
    this.initModal();
    this.getCarplateDetails();
    this.initFormChangesListener();
  }

  initModal() {
    this.dynamicModalService.open(this.vcr, this.modalTemplate, {
      ...defaultSmallModalOptions,
      closeRouteCallback: () => this.router.navigate(['/carplates']),
    });
  }

  initFormChangesListener() {
    this.subs$.add(
      combineLatest([
        this.plateNameControl.valueChanges.pipe(
          startWith(this.plateNameControl.value)
        ),
        this.ownerControl.valueChanges.pipe(startWith(this.ownerControl.value)),
      ])
        .pipe(
          filter(() => !!this.currentCarplate),
          map(([plateName, owner]) => {
            return (
              plateName !== this.currentCarplate.plate_name ||
              owner !== this.currentCarplate.owner
            );
          })
        )
        .subscribe((valueChanged) => {
          this.valueChanged = valueChanged;
        })
    );
  }

  getCarplateDetails() {
    if (this.id) {
      this.subs$.add(
        this.facade
          .selectCarplateById(this.id)
          .pipe(
            switchMap((carplate) => {
              if (!carplate) {
                this.facade.fetchOneCarplate(this.id ?? '');
                return this.isLoaded$.pipe(
                  filter((isLoaded) => isLoaded),
                  switchMap(() => this.facade.selectedCarplate$)
                );
              } else {
                return of(carplate);
              }
            })
          )
          .subscribe((carplate) => {
            this.carplateForm.patchValue({
              plate_name: carplate?.plate_name,
              owner: carplate?.owner,
              createdAt: carplate?.createdAt,
              updatedAt: carplate?.updatedAt,
            });

            this.currentCarplate = this.carplateForm.value;
          })
      );
    }
  }

  onSave() {
    if (this.isFormSaveable) {
      this.facade.clearErrors();

      const { plate_name, owner } = this.carplateForm.value;

      if (this.isNew) {
        this.facade.createCarplate({
          plate_name: plate_name ?? '',
          owner: owner ?? '',
        });
      } else {
        this.facade.updateCarplate(this.id ?? '', {
          plate_name:
            plate_name !== this.currentCarplate.plate_name
              ? plate_name ?? ''
              : '',
          owner: owner !== this.currentCarplate.owner ? owner ?? '' : '',
        });
      }

      this.facade.saved$.subscribe((saved) => {
        if (saved) {
          this.close();
        }
      });
    }
  }

  close() {
    this.dynamicModalService.close();
  }

  ngOnDestroy(): void {
    this.facade.clearErrors();
    this.subs$.unsubscribe();
  }
}
