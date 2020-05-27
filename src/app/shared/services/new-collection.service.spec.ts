import { TestBed } from '@angular/core/testing';

import { NewCollectionService } from './new-collection.service';

describe('NewCollectionService', () => {
  let service: NewCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
