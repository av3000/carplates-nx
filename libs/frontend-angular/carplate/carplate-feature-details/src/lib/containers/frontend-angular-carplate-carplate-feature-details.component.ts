// TODO: handle errors and display them to the user
// TODO: sort carplated by default by updatedAt and add time pipe to display friendly time
// TODO: after display items per page and current page changes, the url should be updated as well
// for ex: table display=6 and after create, update or delete, the refresh sets back to 3

import {
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
import { ownerFormatPattern, plateFormatPattern } from '@shared/common/utils';
import { defaultSmallModalOptions } from '@shared/common/constants';

@Component({
  selector: 'carplates-frontend-angular-carplate-carplate-feature-details',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-details.component.html',
})
export class FrontendAngularCarplateCarplateFeatureDetailsComponent
  implements OnInit, OnDestroy
{
  MAX_OWNER_LENGTH = 30;
  MIN_OWNER_LENGTH = 3;

  @ViewChild('view', { static: true }) modalTemplate!: TemplateRef<any>;
  @ViewChild('view', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  private subs$ = new Subscription();
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;
  carplateForm = this.formBuilder.group({
    plate_name: [
      '',
      [Validators.required, Validators.pattern(plateFormatPattern)],
    ],
    owner: [
      '',
      [
        Validators.required,
        Validators.minLength(this.MIN_OWNER_LENGTH),
        Validators.maxLength(this.MAX_OWNER_LENGTH),
        Validators.pattern(ownerFormatPattern),
      ],
    ],
    createdAt: [''],
    updatedAt: [''],
  });

  valueChanged = false;
  initialCarplate!: any;

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
          filter(() => !!this.initialCarplate),
          map(([plateName, owner]) => {
            return (
              plateName !== this.initialCarplate.plate_name ||
              owner !== this.initialCarplate.owner
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

            this.initialCarplate = this.carplateForm.value;
          })
      );
    }
  }

  onSave() {
    if (this.isFormSaveable) {
      const { plate_name, owner } = this.carplateForm.value;
      if (this.isNew) {
        this.facade.createCarplate({
          plate_name: plate_name ?? '',
          owner: owner ?? '',
        });
      } else {
        this.facade.updateCarplate(this.id ?? '', {
          plate_name: plate_name ?? '',
          owner: owner ?? '',
        });
      }
    }

    this.close();
  }

  close() {
    this.dynamicModalService.close();
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
