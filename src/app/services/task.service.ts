import { Injectable } from '@angular/core';
import {Storage} from './storage';
import {CONSTANTS} from '../commons/constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private static idNum: number = TaskService.initIdAccForNewTasks();

  private static initIdAccForNewTasks(): number {
    const tasks = Storage.getItemByKey(CONSTANTS.LOCAL_STORAGE.TASKS);
    let idAcc = 1;

    if (tasks) {
      for (const task of tasks) {
        if (task.id <= idAcc) {
          idAcc = task.id + 1;
        }
      }
    }

    return idAcc;
  }

  constructor() { }

  saveTask(task: any, isNew: boolean): void {
    if (isNew) {
      Storage.insertItemToArray(CONSTANTS.LOCAL_STORAGE.TASKS, task);
    } else {
      Storage.editItemOnArray(CONSTANTS.LOCAL_STORAGE.TASKS, task);
    }
  }

  getTasks() {
    return Storage.getItemByKey(CONSTANTS.LOCAL_STORAGE.TASKS) || [];
  }

  deleteTask(id: number): void {
    Storage.deleteItem(CONSTANTS.LOCAL_STORAGE.TASKS, id);
  }

  setNewId() {
    return TaskService.idNum++;
  }

  isHideCompletedChecked() {
    return Storage.getItemByKey(CONSTANTS.LOCAL_STORAGE.HIDE_COMPLETED) || false;
  }

  setHideCompletedIndicator(hideCompleted: boolean) {
    Storage.setItem(CONSTANTS.LOCAL_STORAGE.HIDE_COMPLETED, hideCompleted);
  }
}
