import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsHistoryFormComponent } from './patients-history-form.component';

describe('PatientsHistoryFormComponent', () => {
  let component: PatientsHistoryFormComponent;
  let fixture: ComponentFixture<PatientsHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsHistoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
