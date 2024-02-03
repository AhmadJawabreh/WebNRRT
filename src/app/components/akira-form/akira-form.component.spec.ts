import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AKIRAFormComponent } from './akira-form.component';

describe('AKIRAFormComponent', () => {
  let component: AKIRAFormComponent;
  let fixture: ComponentFixture<AKIRAFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AKIRAFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AKIRAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
