import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CONSTANTS} from '../commons/constants';
import {ICredential} from '../models/interfaces/iCredential';
import {Storage} from './storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(private router: Router) { }

  private isCredentialValid(credential: ICredential): Promise<any> {
    return new Promise((resolve, reject) => {
      if (credential) {
        resolve(credential.username === 'test' && credential.password === 'test');
      } else {
        reject('Unable to translate credentials object');
      }
    });
  }

  login(credential: ICredential): Promise<any> {
    const isValid = this.isCredentialValid(credential);

    if (isValid) {
      const dayInMili = 1000 * 60 * 60 * 24;

      Storage.setItem(CONSTANTS.LOCAL_STORAGE.JWT_REPLACE, new Date().getTime() + dayInMili);
    }

    return new Promise(res => res(isValid));
  }

  logout(redirectToLogin?: boolean): void {
    Storage.deleteItem(CONSTANTS.LOCAL_STORAGE.JWT_REPLACE);

    if (redirectToLogin) {
      this.router.navigate(['./login']);
    }
  }

  canActivate(): boolean {
    const jwt = Storage.getItemByKey(CONSTANTS.LOCAL_STORAGE.JWT_REPLACE);
    const currentTimeInMili = new Date().getTime();

    if (!isNaN(jwt) && jwt > currentTimeInMili) {
      return true;
    }

    this.router.navigate(['./login']);
  }
}
