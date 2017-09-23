import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedMenuComponent } from './ged-menu.component';

describe('GedMenuComponent', () => {
  let component: GedMenuComponent;
  let fixture: ComponentFixture<GedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  */
});
