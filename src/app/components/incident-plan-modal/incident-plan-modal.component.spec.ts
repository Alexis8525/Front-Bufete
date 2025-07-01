import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentPlanModalComponent } from './incident-plan-modal.component';

describe('IncidentPlanModalComponent', () => {
  let component: IncidentPlanModalComponent;
  let fixture: ComponentFixture<IncidentPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentPlanModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
