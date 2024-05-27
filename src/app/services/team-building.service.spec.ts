import { TestBed } from '@angular/core/testing';

import { TeamBuildingService } from './team-building.service';

describe('TeamBuildingService', () => {
  let service: TeamBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
