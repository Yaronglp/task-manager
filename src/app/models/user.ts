export class User {
  private _username: string;
  private _email: string;
  private _profilePic: string;

  constructor(username: string, email: string, profilePic: string) {
    this._username = username;
    this._email = email;
    this._profilePic = profilePic;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get profilePic(): string {
    return this._profilePic;
  }

  set profilePic(value: string) {
    this._profilePic = value;
  }
}
