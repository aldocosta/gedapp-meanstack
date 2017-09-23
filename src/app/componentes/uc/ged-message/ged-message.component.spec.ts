import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GedMessageComponent } from './ged-message.component';

describe('GedMessageComponent', () => {
  let component: GedMessageComponent;
  let fixture: ComponentFixture<GedMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GedMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
