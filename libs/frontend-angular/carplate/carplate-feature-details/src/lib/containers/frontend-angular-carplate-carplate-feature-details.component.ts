import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, filter, of, switchMap } from 'rxjs';

import { CarplateFacade } from '@frontend-angular/carplate/carplate-data-access';
import { DynamicModalService } from '@frontend-angular/shared/ui/modal';

@Component({
  selector: 'carplates-frontend-angular-carplate-carplate-feature-details',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-details.component.html',
})
export class FrontendAngularCarplateCarplateFeatureDetailsComponent
  implements OnInit
{
  @ViewChild('view', { static: true }) modalTemplate!: TemplateRef<any>;
  @ViewChild('view', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  private subs$ = new Subscription();
  isLoading$ = this.facade.isLoading$;
  isLoaded$ = this.facade.isLoaded$;
  // TODO: add validators, reuse from shared validators/regex
  // TODO: add hints
  // TODO: disable fields where not editable - formChanged observable which will be piped async in template with boolean value
  carplateForm = this.formBuilder.group({
    plate_name: [''],
    owner: [''],
    createdAt: [''],
    updatedAt: [''],
  });

  initialCarplate!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dynamicModalService: DynamicModalService,
    private facade: CarplateFacade,
    private formBuilder: FormBuilder
  ) {}

  get id(): string {
    return this.route.snapshot.paramMap.get('id') || '';
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
  }

  initModal() {
    this.dynamicModalService.open(this.vcr, this.modalTemplate, {
      animations: {
        modal: {
          enter: 'enter-slide-down 0.8s',
        },
        overlay: {
          enter: 'fade-in 0.8s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '30rem', // create and use standard modal sizes consts
      },
      closeRouteCallback: () => this.router.navigate(['/carplates']),
    });
  }

  getCarplateDetails() {
    if (this.id) {
      this.subs$.add(
        this.facade
          .selectCarplateById(this.id)
          .pipe(
            switchMap((carplate) => {
              if (!carplate) {
                this.facade.fetchOneCarplate(this.id); // TODO: on reload or direct link it should fetch directy and not add to the carplates state to avoid duplicating
                return this.isLoaded$.pipe(
                  filter((isLoaded) => isLoaded),
                  switchMap(() => this.facade.selectCarplateById(this.id))
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

            this.initialCarplate = this.carplateForm;
          })
      );
    }
  }

  close() {
    this.dynamicModalService.close();
  }
}
