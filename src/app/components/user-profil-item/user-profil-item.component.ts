import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../modele/user';

@Component({
  selector: 'app-user-profil-item',
  templateUrl: './user-profil-item.component.html',
  styleUrls: ['./user-profil-item.component.scss'],
})
export class UserProfilItemComponent implements OnInit {
  @Input() public user: User;
  @Output() public back: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

}
