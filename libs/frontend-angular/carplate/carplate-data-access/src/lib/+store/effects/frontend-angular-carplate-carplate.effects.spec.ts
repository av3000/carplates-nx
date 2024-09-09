import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';

import { hot, cold } from 'jest-marbles';
import { Observable, of, throwError } from 'rxjs';

import { Carplate } from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';

import { CarplateEffects } from './frontend-angular-carplate-carplate.effects';
import { CarplateService } from '../../frontend-angular-carplate-carplate.service';
import {
  actionTypes,
  createCarplate,
  createCarplateFailure,
  createCarplateSuccess,
  deleteCarplate,
  deleteCarplateFailure,
  deleteCarplateSuccess,
  fetchAllCarplates,
  fetchAllCarplatesFailure,
  fetchAllCarplatesSuccess,
  fetchOneCarplate,
  fetchOneCarplateFailure,
  fetchOneCarplateSuccess,
  updateCarplate,
  updateCarplateFailure,
  updateCarplateSuccess,
} from '../actions/frontend-angular-carplate-carplate.actions';
import {
  carplateCreateParamsMock,
  carplateMock,
  carplatesListMock,
  errorMock,
  filtersMock,
} from '../__mocks__/carplate-fixtures';
import { initialState } from '../reducer/frontend-angular-carplate-carplate.reducer';
import { Action } from '@ngrx/store';

describe('CarplateEffects', () => {
  let actions$ = new Observable<Action>();
  let service: CarplateService;
  let effects: CarplateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EffectsModule.forRoot([CarplateEffects])],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        CarplateEffects,
        {
          provide: CarplateService,
          useValue: {
            getCarplatesList: () => jest.fn(),
            getCarplate: () => jest.fn(),
            createCarplate: () => jest.fn(),
            updateCarplate: () => jest.fn(),
            deleteCarplate: () => jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(CarplateService);
    effects = TestBed.inject(CarplateEffects);
  });

  describe('should', () => {
    test('be created', () => {
      expect(effects).toBeTruthy();
    });
  });

  const loadCarplatesListCases: [
    string,
    string,
    Observable<PaginatedList<Carplate>>
  ][] = [
    [`dispatch ${actionTypes.fetchAllCarplates}`, '-b', of(carplatesListMock)],
    [
      `dispatch ${actionTypes.fetchAllCarplatesFailure}`,
      '-c',
      throwError(() => errorMock),
    ],
  ];

  describe.each(loadCarplatesListCases)(
    'loadCarplatesPaginated$',
    (
      description: string,
      marble: string,
      carplatesList: Observable<PaginatedList<Carplate>>
    ) => {
      const marbleValues = {
        a: fetchAllCarplates({ filters: filtersMock }),
        b: fetchAllCarplatesSuccess({ carplatesList: carplatesListMock }),
        c: fetchAllCarplatesFailure({ error: errorMock }),
      };

      test(description, () => {
        // GIVEN
        actions$ = hot('-a-', marbleValues);
        const expected = cold(marble, marbleValues);

        // WHEN
        jest
          .spyOn(service, 'getCarplatesList')
          .mockReturnValueOnce(carplatesList);

        // THEN
        expect(effects.loadCarplatesPaginated$).toBeObservable(expected);
      });
    }
  );

  const loadOneCarplateCases: [string, string, Observable<Carplate>][] = [
    [`dispatch ${actionTypes.fetchOneCarplate}`, '-b', of(carplateMock)],
    [
      `dispatch ${actionTypes.fetchOneCarplateFailure}`,
      '-c',
      throwError(() => errorMock),
    ],
  ];

  describe.each(loadOneCarplateCases)(
    'loadOneCarplate$',
    (description: string, marble: string, carplate: Observable<Carplate>) => {
      const marbleValues = {
        a: fetchOneCarplate({ id: carplateMock.id }),
        b: fetchOneCarplateSuccess({ carplate: carplateMock }),
        c: fetchOneCarplateFailure({ error: errorMock }),
      };

      test(description, () => {
        // GIVEN
        actions$ = hot('-a-', marbleValues);
        const expected = cold(marble, marbleValues);

        // WHEN
        jest.spyOn(service, 'getCarplate').mockReturnValueOnce(carplate);

        // THEN
        expect(effects.loadOneCarplate$).toBeObservable(expected);
      });
    }
  );

  const createCarplateCases: [string, string, Observable<Carplate | never>][] =
    [
      [`dispatch ${actionTypes.createCarplate}`, '-b', of(carplateMock)],
      [
        `dispatch ${actionTypes.createCarplateFailure}`,
        '-c',
        throwError(() => errorMock),
      ],
    ];

  describe.each(createCarplateCases)(
    'createCarplate$',
    (
      description: string,
      marble: string,
      serverResponse: Observable<Carplate | never>
    ) => {
      const marbleValues = {
        a: createCarplate({ carplateParams: carplateCreateParamsMock }),
        b: createCarplateSuccess({ carplate: carplateMock }),
        c: createCarplateFailure({ error: errorMock }),
      };

      test(description, () => {
        // GIVEN
        actions$ = hot('-a-', marbleValues);
        const expected = cold(marble, marbleValues);

        // WHEN
        jest
          .spyOn(service, 'createCarplate')
          .mockReturnValueOnce(serverResponse);

        // THEN
        expect(effects.createCarplate$).toBeObservable(expected);
      });
    }
  );

  const updateCarplateCases: [string, string, Observable<Carplate | never>][] =
    [
      [`dispatch ${actionTypes.updateCarplate}`, '-b', of(carplateMock)],
      [
        `dispatch ${actionTypes.updateCarplateFailure}`,
        '-c',
        throwError(() => errorMock),
      ],
    ];

  describe.each(updateCarplateCases)(
    'updateCarplate$',
    (
      description: string,
      marble: string,
      serverResponse: Observable<Carplate | never>
    ) => {
      const marbleValues = {
        a: updateCarplate({
          id: carplateMock.id,
          carplateParams: carplateCreateParamsMock,
        }),
        b: updateCarplateSuccess({ carplate: carplateMock }),
        c: updateCarplateFailure({ error: errorMock }),
      };

      test(description, () => {
        // GIVEN
        actions$ = hot('-a-', marbleValues);
        const expected = cold(marble, marbleValues);

        // WHEN
        jest
          .spyOn(service, 'updateCarplate')
          .mockReturnValueOnce(serverResponse);

        // THEN
        expect(effects.updateCarplate$).toBeObservable(expected);
      });
    }
  );

  const deleteCarplateCases: [string, string, Observable<void | never>][] = [
    [`dispatch ${actionTypes.deleteCarplate}`, '-b', of(undefined)],
    [
      `dispatch ${actionTypes.deleteCarplateFailure}`,
      '-c',
      throwError(() => errorMock),
    ],
  ];

  describe.each(deleteCarplateCases)(
    'deleteCarplate$',
    (
      description: string,
      marble: string,
      serverResponse: Observable<void | never>
    ) => {
      const marbleValues = {
        a: deleteCarplate({
          id: carplateMock.id,
        }),
        b: deleteCarplateSuccess(),
        c: deleteCarplateFailure({ error: errorMock }),
      };

      test(description, () => {
        // GIVEN
        actions$ = hot('-a-', marbleValues);
        const expected = cold(marble, marbleValues);

        // WHEN
        jest
          .spyOn(service, 'deleteCarplate')
          .mockReturnValueOnce(serverResponse);

        // THEN
        expect(effects.deleteCarplate$).toBeObservable(expected);
      });
    }
  );
});
