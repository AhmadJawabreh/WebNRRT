import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsMovementsComponent } from './patients-movements.component';

describe('PatientsMovementsComponent', () => {
  let component: PatientsMovementsComponent;
  let fixture: ComponentFixture<PatientsMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsMovementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
