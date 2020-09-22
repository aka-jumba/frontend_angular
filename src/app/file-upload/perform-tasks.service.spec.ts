import { TestBed } from '@angular/core/testing';

import { PerformTasksService } from './perform-tasks.service';

describe('PerformTasksService', () => {
  let service: PerformTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
