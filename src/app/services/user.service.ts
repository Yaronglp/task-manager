import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Storage} from './storage';
import {CONSTANTS} from '../commons/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    const item = Storage.getItemByKey(CONSTANTS.LOCAL_STORAGE.USER.OBJECT_NAME) || {};
    const username = item.username || '';
    const email = item.email || '';
    const profilePic = item.profilePic || '';

    return new User(username, email, profilePic);
  }

  saveUser(user: any): void {
    Storage.setItem(CONSTANTS.LOCAL_STORAGE.USER.OBJECT_NAME, user);
  }
}
