import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRmComponent } from './manager-rm.component';

describe('ManagerRmComponent', () => {
  let component: ManagerRmComponent;
  let fixture: ComponentFixture<ManagerRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
