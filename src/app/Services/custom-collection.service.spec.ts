import { TestBed } from '@angular/core/testing';

import { CustomCollectionService } from './custom-collection.service';

describe('CustomCollectionService', () => {
  let service: CustomCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
