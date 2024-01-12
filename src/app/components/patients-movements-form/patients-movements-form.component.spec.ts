import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsMovementsFormComponent } from './patients-movements-form.component';

describe('PatientsMovementsFormComponent', () => {
  let component: PatientsMovementsFormComponent;
  let fixture: ComponentFixture<PatientsMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsMovementsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
