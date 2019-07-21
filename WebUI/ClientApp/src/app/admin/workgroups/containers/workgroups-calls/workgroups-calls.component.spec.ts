import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupsCallsComponent } from './workgroups-calls.component';

describe('WorkgroupsCallsComponent', () => {
  let component: WorkgroupsCallsComponent;
  let fixture: ComponentFixture<WorkgroupsCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupsCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupsCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
