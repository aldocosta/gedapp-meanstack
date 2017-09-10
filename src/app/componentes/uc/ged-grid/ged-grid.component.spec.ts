import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedGridComponent } from './ged-grid.component';

describe('GedGridComponent', () => {
  let component: GedGridComponent;
  let fixture: ComponentFixture<GedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
