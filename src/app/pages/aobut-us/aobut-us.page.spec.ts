import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AobutUsPage } from './aobut-us.page';

describe('AobutUsPage', () => {
  let component: AobutUsPage;
  let fixture: ComponentFixture<AobutUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AobutUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AobutUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
