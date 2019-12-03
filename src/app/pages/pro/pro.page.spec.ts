import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProPage } from './pro.page';

describe('ProPage', () => {
  let component: ProPage;
  let fixture: ComponentFixture<ProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
