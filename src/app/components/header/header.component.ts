import { Component, OnInit } from '@angular/core';
import {ProfileComponent} from '../dialogs/profile/profile.component';
import {DialogConfig} from '../dialogs/dialog-config';
import {MatDialog} from '@angular/material';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private readonly maxCharactersDisplayed = 30;
  user: User;

  constructor(public dialog: MatDialog,
              private userService: UserService,
              private loginService: LoginService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {}

  displayedProfileName() {
    let displayedName: string;

    if (this.user.username.length > 0) {
      displayedName = this.user.username.length > this.maxCharactersDisplayed ?
        `${this.user.username.slice(0, this.maxCharactersDisplayed)}...` : this.user.username;
    } else {
      displayedName = 'Hello Guest';
    }

    return displayedName;
  }

  openDialog(): void {
    const option = {
      data: {
        user: this.user
      }
    };

    const dialogRef = this.dialog.open(ProfileComponent, DialogConfig.profile(option));

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.username = result.username;
        this.user.email = result.email;
        this.user.profilePic = result.profilePic;
      }
      console.log('Setting dialog was closed');
    });
  }

  onLogoutClick(): void {
    this.loginService.logout(true);
  }
}
