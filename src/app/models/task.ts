import {Entity} from './entity';

export class Task extends Entity {
  private _status: string;
  private _title: string;
  private _priority: string;
  private _dueDate: number;

  constructor(status: string, title: string, priority: string, dueDate: number, id: number) {
    super(id);
    this._status = status;
    this._title = title;
    this._priority = priority;
    this._dueDate = dueDate;
  }

  get status(): string {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get priority(): string {
    return this._priority;
  }

  get dueDate(): number {
    return this._dueDate;
  }

  set status(value: string) {
    this._status = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set priority(value: string) {
    this._priority = value;
  }

  set dueDate(value: number) {
    this._dueDate = value;
  }
}
