import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientAcceptComponent } from './client-accept.component';


describe('ClientListComponent', () => {
  let component: ClientAcceptComponent;
  let fixture: ComponentFixture<ClientAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
