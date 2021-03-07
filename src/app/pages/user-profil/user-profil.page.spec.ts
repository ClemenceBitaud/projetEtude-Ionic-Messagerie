import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserProfilPage } from './user-profil.page';

describe('UserProfilPage', () => {
  let component: UserProfilPage;
  let fixture: ComponentFixture<UserProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
