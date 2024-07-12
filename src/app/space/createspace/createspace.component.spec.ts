import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatespaceComponent } from './createspace.component';

describe('CreatespaceComponent', () => {
  let component: CreatespaceComponent;
  let fixture: ComponentFixture<CreatespaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatespaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
