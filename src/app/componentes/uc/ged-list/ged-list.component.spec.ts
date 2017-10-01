import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedListComponent } from './ged-list.component';

describe('GedListComponent', () => {
  let component: GedListComponent;
  let fixture: ComponentFixture<GedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
