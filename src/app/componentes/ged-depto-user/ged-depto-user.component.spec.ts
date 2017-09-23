import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedDeptoUserComponent } from './ged-depto-user.component';

describe('GedDeptoUserComponent', () => {
  let component: GedDeptoUserComponent;
  let fixture: ComponentFixture<GedDeptoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedDeptoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedDeptoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
