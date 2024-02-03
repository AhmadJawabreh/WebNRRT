import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AKIRAComponent } from './akira.component';

describe('AKIRAComponent', () => {
  let component: AKIRAComponent;
  let fixture: ComponentFixture<AKIRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AKIRAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AKIRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
