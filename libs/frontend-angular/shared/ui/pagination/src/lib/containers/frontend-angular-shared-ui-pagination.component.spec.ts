import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './frontend-angular-shared-ui-pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
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
