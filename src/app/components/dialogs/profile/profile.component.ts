import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  inputGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<ProfileComponent>,
              private userService: UserService) {
    const userData = this.dialogData.data.user;

    this.inputGroup = new FormGroup({
      userNameControl: new FormControl(userData.username, [
        Validators.required
      ]),
      emailControl: new FormControl(userData.email, []),
      profilePicControl: new FormControl(userData.profilePic, [])
    });
  }

  onSave() {
    const formControl = this.inputGroup.controls;
    const objToSave = {
      username: formControl.userNameControl.value,
      email: formControl.emailControl.value,
      profilePic: formControl.profilePicControl.value,
    };

    this.userService.saveUser(objToSave);
    this.dialogRef.close(objToSave);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
