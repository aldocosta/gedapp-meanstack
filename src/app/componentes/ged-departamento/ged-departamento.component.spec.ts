import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedDepartamentoComponent } from './ged-departamento.component';

describe('GedDepartamentoComponent', () => {
  let component: GedDepartamentoComponent;
  let fixture: ComponentFixture<GedDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
