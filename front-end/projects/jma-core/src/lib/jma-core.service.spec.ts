import { TestBed } from '@angular/core/testing';

import { JmaCoreService } from './jma-core.service';

describe('JmaCoreService', () => {
  let service: JmaCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JmaCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
