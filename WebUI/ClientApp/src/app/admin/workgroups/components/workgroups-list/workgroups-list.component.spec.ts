import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupsListComponent } from './workgroups-list.component';

describe('WorkgroupsListComponent', () => {
  let component: WorkgroupsListComponent;
  let fixture: ComponentFixture<WorkgroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
