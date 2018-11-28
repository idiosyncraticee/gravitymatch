import { TestBed } from '@angular/core/testing';

import { MyfirestoreService } from './myfirestore.service';

describe('MyfirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyfirestoreService = TestBed.get(MyfirestoreService);
    expect(service).toBeTruthy();
  });
});
