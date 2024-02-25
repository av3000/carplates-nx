import { Component, OnInit } from '@angular/core';

import { Carplate } from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';

@Component({
  selector:
    'carplates-frontend-angular-carplate-carplate-feature-carplate-list',
  templateUrl:
    './frontend-angular-carplate-carplate-feature-carplate-list.component.html',
})
export class FrontendAngularCarplateCarplateFeatureCarplateListComponent
  implements OnInit
{
  carplates: PaginatedList<Carplate> = {
    currentPage: 0,
    totalPages: 1,
    count: 2,
    rows: [
      {
        id: '0e58bb48-0678-481c-9bfd-100f78f8baaf',
        plate_name: 'BBB222',
        owner: 'John Doesnt',
        createdAt: '2024-02-21T23:15:34.000Z',
        updatedAt: '2024-02-22T15:35:12.000Z',
      },
      {
        id: '2900e7d4-2c73-4382-98eb-ee5e38d8d9f5',
        plate_name: 'EEE777',
        owner: 'avtreeh',
        createdAt: '2024-02-21T23:14:28.000Z',
        updatedAt: '2024-02-21T23:14:28.000Z',
      },
      {
        id: '9a9430ef-f7e0-4da2-b8af-83d68ac5734b',
        plate_name: 'AAA123',
        owner: 'avtreeh',
        createdAt: '2024-02-21T23:15:18.000Z',
        updatedAt: '2024-02-21T23:15:18.000Z',
      },
    ],
  };

  ngOnInit() {
    console.log('FrontendAngularCarplateCarplateFeatureCarplateListModule');
  }
}
