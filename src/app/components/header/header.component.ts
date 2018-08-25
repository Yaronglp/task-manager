import {Component, OnInit} from '@angular/core';
import {ProfileComponent} from '../dialogs/profile/profile.component';
import {DialogConfig} from '../dialogs/dialog-config';
import {MatDialog} from '@angular/material';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {CONSTANTS} from '../../commons/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  displayedUserName: string;

  constructor(public dialog: MatDialog,
              private userService: UserService,
              private loginService: LoginService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.displayedUserName = this.initDisplayedUsername();
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
        this.displayedUserName = this.initDisplayedUsername();
      }

      console.log('Setting dialog was closed');
    });
  }

  onLogoutClick(): void {
    this.loginService.logout(true);
  }

  private initDisplayedUsername(): string {
    let displayedName: string;

    if (this.user.username.length > 0) {
      displayedName = this.user.username.length > CONSTANTS.DISPLAY.USERNAME_MAX_CHARACTERS ?
        `${this.user.username.slice(0, CONSTANTS.DISPLAY.USERNAME_MAX_CHARACTERS)}...` : this.user.username;
    } else {
      displayedName = 'Hello Guest';
    }

    return displayedName;
  }
}
