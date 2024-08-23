import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRoomComponent } from './empty-room.component';

describe('EmptyRoomComponent', () => {
  let component: EmptyRoomComponent;
  let fixture: ComponentFixture<EmptyRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyRoomComponent]
    });
    fixture = TestBed.createComponent(EmptyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
